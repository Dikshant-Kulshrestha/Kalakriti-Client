const getTime = (datestring) => {
  const timestamp = (Date.parse(datestring) - Date.now()) / 1000;

  const hours = Math.floor(timestamp / (60 * 60));
  const minutes = Math.floor((timestamp / 60) % 60);
  const seconds = Math.floor((timestamp / 1) % 60);

  return (
    String(hours).padStart(2, 0) +
    ":" +
    String(minutes).padStart(2, 0) +
    ":" +
    String(seconds).padStart(2, 0)
  );
};

export {
  getTime,
}