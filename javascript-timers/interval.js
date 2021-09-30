const $timedH1 = document.querySelector('h1');

var intervalId;
let counter = parseInt($timedH1.textContent);

function countDown() {
  counter--;
  $timedH1.textContent = counter;
  if (counter < 1) {
    $timedH1.textContent = '~Earth Beeeelooowww Us~';
    return clearInterval(intervalId);
  }
}

intervalId = setInterval(countDown, 1000);
