let gameTable = document.querySelector('table');
let setings = document.querySelector('.setings');
let fromExternalScript;
let targets = [];
let point = document.querySelector('#point');
let timer = document.querySelector('#timer');
let clicks = document.querySelector('#clicks');
let sumCells;
let timerId;

const images = [
  "https://kde.link/test/0.png",
  "https://kde.link/test/1.png",
  "https://kde.link/test/2.png",
  "https://kde.link/test/3.png",
  "https://kde.link/test/4.png",
  "https://kde.link/test/5.png",
  "https://kde.link/test/6.png",
  "https://kde.link/test/7.png",
  "https://kde.link/test/8.png",
  "https://kde.link/test/9.png"
];

gameField = () => {
  let {width, height} = JSON.parse(fromExternalScript);
  sumCells = width * height;

  let copyImg = images.slice(0, sumCells / 2);
  copyImg.forEach(e => copyImg.push(e));
  var arr = [1, 2, 3, 4, 5];

  compareRandom = (a, b) => Math.random() - 0.5;

  copyImg.sort( compareRandom );
  let tBody = document.createElement('tbody');
  tBody.classList.add('gameTable');
  for (let i = 0; width > i; i++) {
    let row = tBody.insertRow(0);
    for (let j = 0; height > j; j++) {
      let cell = row.insertCell(j);
      cell.classList.add('cell');
    }
  };
  let cells = tBody.querySelectorAll('.cell');
  for (let i = 0; cells.length > i; i++) {
    let img = document.createElement('img');
    img.classList.add('hidden');
    img.src = copyImg[i];
    cells[i].appendChild(img);
  }
  gameTable.appendChild(tBody);

  tBody.addEventListener('click', event => {
    if (clicks.textContent == '0') {
      timerId = setInterval(() => {
        timer.textContent++;
      }, 1000);
    };

    clicks.textContent++;

    let target = event.target;
    if (target.className != 'hidden') return;
    targets.push(target);
    let [previous , curent, ...rest] = targets;
    target.classList.remove('hidden');

    if (rest.length == 0 && curent) {

      // проверяем на совпадения
      if (previous.src == curent.src) {
        let t1 = setTimeout(() => {
          curent.parentElement.classList.toggle('hidden');
          previous.parentElement.classList.toggle('hidden');
          targets = [];
        }, 1000)
        showPoint();
      }

      // проверяем на не совпадения
      if (previous.src != curent.src) {
        let t2 = setTimeout(() => {
          curent.classList.toggle('hidden');
          previous.classList.toggle('hidden');
          targets = [];
        }, 1000)
      }

    }
    if (rest.length > 0) {
      rest.forEach(e => e.classList.add('hidden'));
    }
  });
};

showPoint = () => {
  point.textContent++;
  if (point.textContent == sumCells / 2) {
    clearInterval(timerId);
    setTimeout(() => {
      alert(`You win. Result:
        ${point.textContent} points
        ${timer.textContent} seconds
        ${clicks.textContent} clicks`
      )
      gameTable.children[0].remove();
      document.querySelector('.setings').classList.toggle('hidden');
      point.textContent = 0;
      clicks.textContent = 0
      timer.textContent = 0;
    }, 2000);
  }
};

// start = () => {
//   let timerId = setInterval(() => {
//     timer.textContent++;
//   }, 1000);
//   if (point.textContent == sumCells / 2)
//   clearInterval(timerId);
//   return timerId
// }
