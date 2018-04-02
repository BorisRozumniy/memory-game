externalScript = () => {

  let setings = document.createElement( 'div');
  let width = document.createElement( 'input');
  let height = document.createElement( 'input');
  let perform = document.createElement( 'button');
  width.placeholder = 'width';
  height.placeholder = 'height';
  width.type = 'number';
  height.type = 'number';
  perform.textContent = 'perform';
  setings.classList.add('setings');
  setings.appendChild(width);
  setings.appendChild(height);
  setings.appendChild(perform);
  document.body.appendChild(setings);


  perform.addEventListener('click', () => {
    if (width.value > 8 || height.value > 8)
      return alert('больше 8-ми нельзя');
    if (width.value == '') {
      width.value = 4;
    };
    if (height.value == '') {
      height.value = 4;
    };
    let obj = {
      width: width.value,
      height: height.value
    };
    if (width.value < 0 || height.value < 0) return alert('Нужны положительные числа')
    if (width.value % 2 != 0 && height.value % 2 != 0) return alert('Нечетное количество клеток')
    fromExternalScript = JSON.stringify(obj);

    gameField();
    setings.classList.toggle('hidden')
  });
};
externalScript()
