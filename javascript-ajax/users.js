const $userList = document.querySelector('#user-list');
const userRequest = new XMLHttpRequest();

userRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');
userRequest.responseType = 'json';
userRequest.addEventListener('load', function () {
  console.log(userRequest.status);
  console.log(userRequest.response);
  for (let i = 0; i < userRequest.response.length; i++) {
    const userName = document.createElement('li');
    userName.textContent = userRequest.response[i].name;
    $userList.appendChild(userName);
  }
});
userRequest.send();
