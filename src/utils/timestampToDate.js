export default (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hour = hours === 0 ? 12 : hours % 12;
  const min = date.getMinutes();
  const minutes = min < 10 ? `0${min}` : min;
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${month}/${day}/${year} ${hour}:${minutes} ${ampm}`;
};
