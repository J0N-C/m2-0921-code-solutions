let count = 3;
const countDown = () => {
  if (count === 0) {
    clearInterval(intervalID);
    return console.log('Blast off!');
  }
  console.log(count);
  count--;
};
const intervalID = setInterval(countDown, 1000);
