const $imageRow = document.querySelector('#image-row');
const $circleList = document.querySelector('#circle-list').children;
const $pokemonImage = document.querySelector('#pokemon-img');

$imageRow.addEventListener('click', function (event) {
  if (event.target.id !== 'left' && event.target.id !== 'right') return;
  let currentImage = currentActive();
  if (event.target.id === 'right') {
    currentImage++;
    if (currentImage === 5) {
      currentImage = 0;
    }
  }
  if (event.target.id === 'left') {
    currentImage--;
    if (currentImage === -1) {
      currentImage = 4;
    }
  }
  newActive(currentImage);
  chooseImage(currentImage);
});

function currentActive() {
  for (let i = 0; i < $circleList.length; i++) {
    if (/fas/.test($circleList[i].className)) return i;
  }
}

function newActive(number) {
  for (let i = 0; i < $circleList.length; i++) {
    $circleList[i].className = 'far fa-circle fa-2x';
    if (i === number) {
      $circleList[i].className = 'fas fa-circle fa-2x';
    }
  }
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
