const $clickRight = document.querySelector('#right');
const $clickLeft = document.querySelector('#left');
const $circleRow = document.querySelector('#circle-list');
const $circleList = $circleRow.children;
const $pokemonImage = document.querySelector('#pokemon-img');

var intervalID = setInterval(scrollRight, 3000);

$clickRight.addEventListener('click', function () {
  scrollRight();
  resetScroll(intervalID);
});

$clickLeft.addEventListener('click', function () {
  scrollLeft();
  resetScroll(intervalID);
});

$circleRow.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') return;
  var currentImage = parseInt(event.target.getAttribute('data-index'));
  newActive(currentImage);
  resetScroll(intervalID);
});

function scrollRight() {
  let currentImage = currentActive();
  currentImage++;
  if (currentImage === 5) {
    currentImage = 0;
  }
  newActive(currentImage);
}

function scrollLeft() {
  let currentImage = currentActive();
  currentImage--;
  if (currentImage === -1) {
    currentImage = 4;
  }
  newActive(currentImage);
}

function resetScroll(id) {
  clearInterval(id);
  intervalID = setInterval(scrollRight, 3000);
}

function currentActive() {
  for (let i = 0; i < $circleList.length; i++) {
    if ($circleList[i].matches('.fas')) return i;
  }
}

function newActive(number) {
  for (let i = 0; i < $circleList.length; i++) {
    $circleList[i].classList.replace('fas', 'far');
    if (i === number) {
      $circleList[i].classList.replace('far', 'fas');
    }
  }
  chooseImage(number);
}

function chooseImage(number) {
  switch (number) {
    case 0:
      $pokemonImage.setAttribute('src', 'images/001.png');
      break;
    case 1:
      $pokemonImage.setAttribute('src', 'images/004.png');
      break;
    case 2:
      $pokemonImage.setAttribute('src', 'images/007.png');
      break;
    case 3:
      $pokemonImage.setAttribute('src', 'images/025.png');
      break;
    case 4:
      $pokemonImage.setAttribute('src', 'images/039.png');
      break;
  }
}
