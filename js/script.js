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

let copyImg = images.slice();
images.forEach(e => copyImg.push(e));
copyImg.sort( () => randomInteger(0, copyImg.length) );


let lastClick = '';
let previousTarget = [];
let point = 0;
gameField = () => {
  let {width, height} = JSON.parse(fromExternalScript);
  let table = document.createElement('table');
    for (let i = 0; width > i; i++) {
      let row = table.insertRow(0);
      for (let j = 0; height > j; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        row.insertCell(j).appendChild(cell);
      }
    };
    // insertImg = () => {
      let cells = table.querySelectorAll('.cell');
      for (let i = 0; cells.length > i; i++) {
        // let rand = randomInteger(0, width * height -1);
        // console.log(rand)
        let img = document.createElement('img');
        img.classList.add('hidden');
        img.src = copyImg[i];
        cells[i].appendChild(img)
        // if (cells[rand].children.length == 0)
        //   cells[rand].appendChild(img)

          // for (let j = 0; cells.length > j; j++) {
            // if (cells[j].children.length == 0)
            // console.log(img)
          // }
      };
    // };
    // console.dir(table.querySelectorAll('.cell')[15])
    table.classList.add('gameTable');
  document.body.appendChild(table);


  table.addEventListener('click', event => {
    let target = event.target;
    console.log(target)
    if (target.className != 'hidden') return;
    // console.dir(target)
    previousTarget.push(target);
    target.classList.toggle('hidden');

    // проверяем на совпадения
    if (lastClick == target.src) {
      // console.log("==")
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
      // console.log('" "');
      return;
    }

    if (lastClick !=target.src) {
      // console.log("!=target.src")
      lastClick = '';
      setTimeout(() => {
        target.classList.toggle('hidden')
        previousTarget[previousTarget.length-2].classList.toggle('hidden');
      }, 1200)
    }
  });
};
// gameField();

showPoint = () => {
  let pointWiev = document.querySelector('#pointWiev');
  point++;
  pointWiev.textContent = point;
}

//не вникал
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
};

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
