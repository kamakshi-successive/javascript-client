function getRandomNumber(max) {
  return (Math.floor((Math.random() * max)));
}
function getNextRoundRobin(max, current) {
  return (current + 1) % max;
}

export { getRandomNumber, getNextRoundRobin };
