externalScript = () => {

  let setings = document.createElement( 'div');
  let width = document.createElement( 'input');
  let height = document.createElement( 'input');
  let perform = document.createElement( 'button');
  width.placeholder = 'width = 4';
  height.placeholder = 'height = 4';
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
    if (width.value == '' || height.value == '') {
      width.value = 4;
      height.value = 4;
    };
    if (width.value < 2 || height.value < 2) {
      alert("Слишком просто для тебя. Попробуй 2 х 2");
      width.value = 2;
      height.value = 2;
    };
    let obj = {
      width: width.value,
      height: height.value
    };
    fromExternalScript = JSON.stringify(obj);
    width.value = '';
    height.value = '';
    // console.log(obj)

    gameField();
    setings.classList.toggle('hidden')
    // let event = new Event('click', {bubbles: true});
    // perform.dispatchEvent(event);
  });
};
externalScript()
