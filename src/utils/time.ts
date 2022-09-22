const createTimeStamp = (date: Date) => {
  const hours = date.getHours();
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutes = date.getMinutes();
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}:${minutesString}`;
};

export const getTimeValues = () => {
  const ONE_HOUR = 1000 * 60 * 60;
  const NOW = new Date();
  const ONE_HOUR_AGO = NOW.getTime() - ONE_HOUR;

  const CURRENT_TIMESTAMP = createTimeStamp(NOW);
  const PAST_TIMESTAMP = createTimeStamp(new Date(ONE_HOUR_AGO));

  return { ONE_HOUR_AGO, CURRENT_TIMESTAMP, PAST_TIMESTAMP };
};
