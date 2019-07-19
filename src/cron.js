import sendMail from 'lib/sendMail';
import { Subscriber, Tag, Interview } from 'database/models';
import { sendInterviewHtml } from 'messages/sendInterview';
import db from './database/db';

const createMailForm = (email, subject, html) => {
  return { email, subject, html };
};

const getItvIdsSet = async () => {
  const interviews = await Interview
    .find()
    .select('_id');
  const itvIds = new Set(Array.from(interviews, obj => String(obj._id)));
  return itvIds;
}

const getTags = async () => {
  const tags = await Tag.find(
    { }, 
    { name: 1, interviews: 1 },
  );
  return tags;
}

const getSubs = async () => {
  const subscribers = await Subscriber.find(
    { isCertify: true }, 
    { email: 1, received: 1, favoriteTags:1 },
  );
  return subscribers;
}

const makeRanNum = (arr) => {
  const rand = Math.floor(Math.random() * arr.length);
  return rand;
}

const calcDiff = (allFavItv, receivedSet) => {
  const difference = new Set(
    [...allFavItv].filter(v => !receivedSet.has(v))
  );
  return Array.from(difference);
}

const transformEmailItv = (email, sendable) => {
  return { email, sendable };
}

const choiceInterview = async (subscriber) => {
  const allFavItv = new Set();
  const { email, received } = subscriber;
  const strReceived = received.map(String);
  const tags = await getTags();
  const allItvIds = await getItvIdsSet();
  const receivedSet = new Set(strReceived);

  // favoriteTags가 빈 배열일 경우
  if (subscriber.favoriteTags && !(subscriber.favoriteTags.length)) {
    const sendables = calcDiff(allItvIds, receivedSet);
    return transformEmailItv(email, sendables[makeRanNum(sendables)]);
  }
  subscriber.favoriteTags.forEach(favTag => {
    tags.forEach(tag => {
      // populate 사용하면 될 듯 (join)
      if(tag.name === favTag) {
        tag.interviews.forEach(itv => {
          allFavItv.add(String(itv));
        })
      }
    });
  })
  const sendables = calcDiff(allFavItv, receivedSet);

  // 차집합이 공집합일 경우
  if (!sendables.length) {
    const spareSendables = calcDiff(allItvIds, receivedSet);
    return transformEmailItv(email, spareSendables[makeRanNum(spareSendables)]);
  }
  // 차집합 중에서 보내는 경우
  return transformEmailItv(email, sendables[makeRanNum(sendables)]);
}

const getTimeStamp = () => { 
	const date = new Date();
	let month = String(date.getMonth() + 1);
	let day = String(date.getDate());
	const year = String(date.getFullYear()); 
	
	if (month.length < 2) month = `0${month}`; 
	if (day.length < 2) day = `0${day}`; 
	return [year, month, day].join('-'); 
}

const sendEachMail = async (emailAndItv) => {
  const { email, sendable } = emailAndItv;
  const interview = await Interview
    .findById(sendable)
    .select('question')
    .select('_id');
  const { question, _id } = interview;
  const subject = `[IronMental] ${getTimeStamp()}`;
  const html = sendInterviewHtml(question, _id);
  await sendMail(createMailForm(email, subject, html));
}

const sendAllMail = async (emailAndItvArr) => {
  await Promise.all(
    emailAndItvArr.map(sendEachMail)
  );
}

const updateEachRecived = async (emailAndItv) => {
  const { email, sendable } = emailAndItv;
  await Subscriber.findOneAndUpdate(
    { email }, 
    { $push: { received: sendable } }
  );
}

const updateAllreceived = async (emailAndItvArr) => {
  await Promise.all(
    emailAndItvArr.map(updateEachRecived)  
  );
}

export const handler = async () => {
  db.connect();
  const subscribers = await getSubs();
  const emailAndItvArr = await Promise.all(
    subscribers.map(choiceInterview)  
  );
  await Promise.all([
    sendAllMail(emailAndItvArr),
    updateAllreceived(emailAndItvArr)
  ]);
}