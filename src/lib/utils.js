
export const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));
export const union = (a, b) => new Set([...a, ...b]);

export const getTimeStamp = (date) => {
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  const year = String(date.getFullYear());

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return [year, month, day].join('-');
};

export const isEmpty = obj => {
  if (obj.constructor === Object) {
    return Object.entries(obj).length === 0;
  } else if (obj.constructor === Array) {
    return obj.length === 0;
  } else if (obj.constructor === Set) {
    return obj.size === 0;
  }
};

export const createMailForm = (email, subject, html) => {
  return { email, subject, html };
};