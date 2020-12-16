function getRandomNumber() {
  return (Math.floor((Math.random() * -10)));
}
function getNextRoundRobin(max, current) {
  return (current + 1) % max;
}

export { getRandomNumber, getNextRoundRobin };
