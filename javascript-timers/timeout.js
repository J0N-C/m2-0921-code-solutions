const $timedHeader = document.querySelector('h1');

setTimeout(timedHeaderUpdate, 2000);

function timedHeaderUpdate() {
  $timedHeader.textContent = 'Hello There';
}
