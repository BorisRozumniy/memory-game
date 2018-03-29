let fromExternalScript = {"width":8,"height":4};

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



let lastClick = '';
let previousTarget = [];
let point = 0;
let sumCells;
gameField = () => {
  if (document.querySelector('.gameTable')) {
    document.querySelector('.gameTable').remove();
  }
  let {width, height} = JSON.parse(fromExternalScript);
  sumCells = width * height;
  let copyImg = images.slice(0, sumCells / 2);
  copyImg.forEach(e => copyImg.push(e));
  copyImg.sort( () => randomInteger(0, copyImg.length) );
  let table = document.createElement('table');
    for (let i = 0; width > i; i++) {
      let row = table.insertRow(0);
      for (let j = 0; height > j; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        row.insertCell(j).appendChild(cell);
      }
    };
    let cells = table.querySelectorAll('.cell');
    for (let i = 0; cells.length > i; i++) {
      let img = document.createElement('img');
      img.classList.add('hidden');
      img.src = copyImg[i];
      cells[i].appendChild(img)
    };
    table.classList.add('gameTable');
  document.body.appendChild(table);


  table.addEventListener('click', event => {
    let target = event.target;
    if (target.className != 'hidden') return;
    previousTarget.push(target);
    target.classList.toggle('hidden');

    // проверяем на совпадения
    if (lastClick == target.src) {
      setTimeout(() => {
        target.parentElement.classList.toggle('hidden')
        previousTarget[previousTarget.length-2].parentElement.classList.toggle('hidden');
      }, 1200)
      showPoint();
      lastClick = '';
      return;
    }
    if (lastClick == '') {
      lastClick = target.src;
      return;
    }

    if (lastClick !=target.src) {
      lastClick = '';
      setTimeout(() => {
        target.classList.toggle('hidden')
        previousTarget[previousTarget.length-2].classList.toggle('hidden');
      }, 1200)
    }
  });
};

showPoint = () => {
  let pointWiev = document.querySelector('#pointWiev');
  point++;
  pointWiev.textContent = point;
  if (pointWiev.textContent == sumCells / 2) {
    alert(`You win. Result: ${previousTarget.length}`)
    gameField();
    point = 0;
    previousTarget = [];
    pointWiev.textContent = point;
  }
};


randomInteger = (min, max) => {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
