let gameTable = document.querySelector('table');
let fromExternalScript;
let targets = [];
let point = 0;
let sumCells;

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
  randomInteger = (min, max) => {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };
  copyImg.sort( () => randomInteger(0, copyImg.length) );
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
  gameTable.appendChild(tBody)

  tBody.addEventListener('click', event => {
    let target = event.target;
    if (target.className != 'hidden') return;
    targets.push(target);
    let [previous , curent, ...rest] = targets;
    target.classList.toggle('hidden');

    if (targets.length > 1) {

      // проверяем на совпадения
      if (previous.src == curent.src) {
        let t1 = setTimeout(() => {
          curent.parentElement.classList.toggle('hidden');
          previous.parentElement.classList.toggle('hidden');
          console.log('==', t1);
        }, 1000)
        showPoint();
        return;
      }

      // проверяем на не совпадения
      if (previous.src != curent.src) {
        let t2 = setTimeout(() => {
          curent.classList.toggle('hidden');
          previous.classList.toggle('hidden');
          console.log('!=', t2, target)
          targets = [];
        }, 1000)
      }
      rest.forEach(e => e.classList.toggle('hidden'));
    }
    // console.log(rest, target.src)
  });
};

showPoint = () => {
  let pointWiev = document.querySelector('#pointWiev');
  point++;
  pointWiev.textContent = point;
  if (pointWiev.textContent == sumCells / 2) {
    alert(`You win. Result: ${targets.length}`)
    clearField();
    gameField();
    point = 0;
    targets = [];
    pointWiev.textContent = point;
  }
};

clearField = () => {
  gameTable.children[0].remove()
}
