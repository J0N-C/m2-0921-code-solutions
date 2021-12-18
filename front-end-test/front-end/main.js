const $gradeTable = document.querySelector('#grade-table');
const xhr = new XMLHttpRequest();
/*
function getGradesAll() {
  xhr.open('GET', '/api/grades');
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
}

returned array of table rows. hypothetical assign to "newArr"
for each table row: newArr[index].name, .course, .score
go down list and populate
set up basic css and js to run when this is loaded in.
*/

const displayTable = arr => {
  clearTable();
  createTHead();
  const $tbody = document.createElement('tbody');
  arr.forEach(obj => {
    const $tr = document.createElement('tr');
    const $name = document.createElement('td');
    const $course = document.createElement('td');
    const $score = document.createElement('td');
    $name.textContent = obj.name;
    $course.textContent = obj.course;
    $score.textContent = obj.score;
    $tr.appendChild($name);
    $tr.appendChild($course);
    $tr.appendChild($score);
    $tbody.appendChild($tr);
  });
  $gradeTable.appendChild($tbody);
};

const createTHead = () => {
  const $thead = document.createElement('thead');
  const $trow = document.createElement('tr');
  const $name = document.createElement('th');
  $name.textContent = 'Name';
  const $course = document.createElement('th');
  $course.textContent = 'Course';
  const $score = document.createElement('th');
  $score.textContent = 'Score';
  $trow.appendChild($name);
  $trow.appendChild($course);
  $trow.appendChild($score);
  $thead.appendChild($trow);
  $gradeTable.appendChild($thead);
};

const clearTable = () => {
  if (document.querySelector('thead')) {
    document.querySelector('thead').remove();
  }
  if (document.querySelector('tbody')) {
    document.querySelector('tbody').remove();
  }
};

xhr.addEventListener('load', function () {
  const gradesArr = JSON.parse(xhr.response);
  displayTable(gradesArr);
});
