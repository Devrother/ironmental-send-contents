import sendMail from 'lib/sendMail';
import { Subscriber, Tag, Interview } from 'database/models';
import interviewMail from 'messages/interviewMail';
import keywordHtml from 'messages/keywordHtml';
import db from 'database/db';
import {
  difference,
  union,
  getTimeStamp,
  isEmpty,
  createMailForm,
} from 'lib/utils';

export const selectInterview = interviews => {
  const randIdx = Math.floor(Math.random() * interviews.size);
  return Array.from(interviews)[randIdx];
};

const sendEachMail = async dataToSend => {
  const { email, sendable, question, subscriberId, keywords} = dataToSend;
  const subject = `[IronMental] ${getTimeStamp(new Date())}`;
  const keywordsHtml = keywords.reduce((acc, keyword) => acc + keywordHtml(keyword), '');
  const html = interviewMail(question, sendable, subscriberId, keywordsHtml);

  await sendMail(createMailForm(email, subject, html));
};

const sendAllMail = async datasToSend => {
  await Promise.all(datasToSend.map(sendEachMail));
};

const updateEachReceived = async dataToUpdate => {
  const { email, sendable } = dataToUpdate;
  await Subscriber.findOneAndUpdate(
    { email },
    { $addToSet: { received: sendable } },
  );
};

const updateAllreceived = async datasToUpdate => {
  await Promise.all(datasToUpdate.map(updateEachReceived));
};

export const getInterviewByAllTags = tags => 
  Object.keys(tags).reduce((acc, tag) => union(acc, tags[tag]), new Set());

export const getInterviewsByFavoriteTags = (tags, favoriteTags) => 
  favoriteTags.reduce(
    (acc, favoriteTag) => union(acc, tags[favoriteTag]),
    new Set(),
  );

const selectableInterviews = (tags, favoriteTags) =>
  isEmpty(favoriteTags)
    ? getInterviewByAllTags(tags)
    : getInterviewsByFavoriteTags(tags, favoriteTags);

const getSendableInterview = (tags, received, favoriteTags) => {
  const interviews = difference(
    selectableInterviews(tags, favoriteTags),
    received,
  );

  return isEmpty(interviews)
    ? selectInterview(getInterviewByAllTags(tags))
    : selectInterview(interviews);
};

const addQuestionAndKeywords = async data => {
  const { question, keywords } = await Interview.findById(data.sendable).select('question keywords')
  return {
    ...data,
    question,
    keywords
  };
};

const addSendableInterview = tags => subscriber => {
  return {
    email: subscriber.email,
    subscriberId: subscriber._id,
    sendable: getSendableInterview(
      tags,
      subscriber.received,
      subscriber.favoriteTags,
    ),
  };
};

const getDatasToSend = (subscribers, tags) => {
  return subscribers.map(addSendableInterview(tags)).map(addQuestionAndKeywords);
}
export const handler = async () => {
  db.connect();
  const subscribers = await Subscriber.getSubscribers();
  const tags = await Tag.getTags();
  const datasToSend = await Promise.all(
    getDatasToSend(subscribers, tags),
  );
  await Promise.all([
    sendAllMail(datasToSend),
    updateAllreceived(datasToSend),
  ]);
};
