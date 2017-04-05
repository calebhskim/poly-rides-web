export default (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hour = hours % 12;
  const minutes = date.getMinutes();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${month}/${day}/${year} ${hour}:${minutes} ${ampm}`;
};
