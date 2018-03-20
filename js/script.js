// Глобальные переменные
let
	// выбранная категория select
	selectedCategory = document.querySelector('#selected'),
	// добавить категорию
	categoryBtn = document.querySelector('#add_category'),
	// название новой категории input
	newCategories = document.querySelector('#categories-name');
	// входящий баланс button
	incomingBalance = document.querySelector('#incoming-balance');
	// input с деньгами
	money = document.querySelector('#money'),
	//div для отображения текущего баланса
	showBalance = document.querySelector('#show-balance').children[1],
	// ul список с существующими категориями
	existingCategories = document.querySelector('#existing-categories'),
	// ul список с существующей историей
	existingHistories = document.querySelector('#existing-histories'),
	historyBlock = document.querySelector('.history-block'),
	bgPopup = document.querySelector('.bgpopup'),
	close = document.querySelectorAll('.close'),
	inputEditCategoryName = document.querySelector('#edit-category-name'),
	radioStatus = document.querySelectorAll('input[name="edit-onlyone"]'),
	btnEditCategorySave = document.querySelector('#edit_category'),
	btnEditHistorySave = document.querySelector('#edit_history'),

	selectEditHistoryName = document.querySelector('#select-edit-history'),
	inputEditHistoryMoney = document.querySelector('#edit-money'),


	// основной обьект с данными
	mainObject = {
		// categories: {
		// 	'Без категории': {name: 'Без категории', status: 'consumption'}
		// },
		categories: [
			{name: 'Без категории', status: 'consumption'}
		],
		history: [],
		balance: function() {
			let sum = 0;
			mainObject.history.forEach ((item, i) => {
				let money = mainObject.history[i].money;

				if (mainObject.history[i].category.status == 'consumption' ) {
					mainObject.history[i].money = '-' + money;
				}
				sum += mainObject.history[i].money * 1;
				mainObject.history[i].money = money;

			});

			showBalance.innerHTML = sum;
			return sum;
		},
	};

let {categories, histories} = mainObject;
let key = () => new Date().toLocaleString();


// добавляем категоию в select
// используется в функции addCategoriHandler
addCategoryInSelect = (option, parent, attId) => {
	let newOption = document.createElement('option');
	newOption.text = option;
	newOption.setAttribute('data-categoryId', attId);
	parent.appendChild(newOption);
};

// добавить категорию в DOM как li
// используется в функции addCategoriHandler
insertCategory = (obj) => {
	let category = document.createElement('li'),
		btnEdit = document.createElement('button'),
		btnRemove = document.createElement('button');
	category.classList.add(obj.status);
	category.textContent = obj.name;
	category.setAttribute('data-indexCategory', categories.length - 1);

		btnEdit.classList.add('btn-edit');
		btnEdit.setAttribute('data-popup', 'edit-category');
		btnRemove.classList.add('btn-remove');

		category.appendChild(btnEdit);
		category.appendChild(btnRemove);

	existingCategories.insertBefore(category, existingCategories.firstChild);
};

let categoryTempLink;
//вставляем в объект
createCategoryObj = (name, status) => {
	let object = {
		name: name,
		status: status ? 'income' : 'consumption',
		id: key()
	};

	mainObject.categories.push(object);
	categoryTempLink = (mainObject.categories[mainObject.categories.length-1]);

	//пригодится для связки HTML элемента с categories[index]
	// console.log(`index category '${categories.length-1}'// from createCategoryObj`);
	return object;
};

addCategoriHandler = () => {

	let newCategory = newCategories.value;
	let status = (document.querySelector('#income').checked) ;



	// clearField(newCategories);

	// console.log(`name category: "${newCategory}"`)
	//очищаем input
	newCategories.value = '';

	//вставляем в DOM
	insertCategory( createCategoryObj(newCategory, status) );

	// добавляем category в select
	addCategoryInSelect(newCategory, selectedCategory, categoryTempLink.id);
	addCategoryInSelect(newCategory, selectEditHistoryName, categoryTempLink.id);
};

// вставвляем финансовую операцию в DOM
// используется в changeBalance
insertHistoryItem = obj => {
	let parent = existingHistories;
	console.log(obj, "вставляемый обьект в историю" )
	let {categories: categories} = obj;
	let item = document.createElement('li'),
		category = document.createElement('span'),
		money = document.createElement('b'),
		btnEdit = document.createElement('button'),
		btnRemove = document.createElement('button');

	item.classList.add(obj.category.status);
	item.setAttribute('data-key', key())
	category.textContent = obj.category.name;
	money.textContent = obj.money + 'грн';

		btnEdit.classList.add('btn-edit');
		btnEdit.setAttribute('data-popup', 'edit-history');
		btnRemove.classList.add('btn-remove');

		item.appendChild(category);
		item.appendChild(money);
		item.appendChild(btnEdit);
		item.appendChild(btnRemove);

	parent.insertBefore(item, parent.firstChild);
};

// добавляем доходы и расходы в mainObject
changeBalance = () => {
	let selected = selectedCategory.options[selectedCategory.selectedIndex].value;
	console.log('selected '+selected);
	let category;
	for (item in categories) {
		if (categories[item].name == selected)
		category = categories[item];
	}

	let obj = {
		category: category,
		money: money.value,
		key: key()
	}

	mainObject.history.push(obj);
	// mainObject.history.push(new Item(money.value, selected));
	// console.log(mainObject.history.length, 'length')

	insertHistoryItem( mainObject.history[mainObject.history.length-1]);

	money.value = '';
};

// openPopup решает какой popup открить
openPopup = e => {
	if (!e.target.getAttribute('data-popup')) return;
	//установить data-popup в li>button
	let link = e.target.getAttribute('data-popup');
	let popups = bgPopup.children;
	let coincidence;
	bgPopup.classList.toggle('visible');

	for (let i = 0; popups.length > i; i++) {
		// console.log(i, popups[i])
		if ( link == popups[i].getAttribute('data-popup') ) {
			// console.log(popups[i] , i)
			coincidence = popups[i];
		}
	};
	// console.log(coincidence)//undefined

	coincidence.classList.toggle('visible');
};

// используется в обработчике событий bgPopup
closeHandler = e => {
	if(e.target.className == 'close') {
		bgPopup.classList.toggle('visible');
		e.target.parentElement.classList.toggle('visible');
	};
	if ( e.target.getAttribute('data-save') ) {
		bgPopup.classList.toggle('visible');
		e.target.parentElement.parentElement.classList.toggle('visible');
	};
};

// используется в обработчике событий bgPopup
clearInputs = e => {

	if(e.target.localName != 'button') return;
	for (let i = 0; e.target.parentElement.children.length > i; i++) {
		if(e.target.parentElement.children[i].localName == 'input') {
			let input = e.target.parentElement.children[i];
			console.log(input.value)
			input.value = '';
		}
	}
};
// очищаем значение из переданного аргумента
// применяется в addCategoriHandler
clearField = fieldValue => {
	let removedValue = fieldValue.value;
	fieldValue.value = '';
	return removedValue;
};

// для передачи атрибута из li>.btn-edit в popup
let indexEditing;

// настройки для окна редактирования
editCategoryBtnHandler = e => {
	if (e.target.className != 'btn-edit' ) return;
	indexEditing = e.target.parentElement.getAttribute('data-indexcategory');
	let category = categories[indexEditing];
	inputEditCategoryName.value = category.name;
	category.status === "income" ? radioStatus[0].checked = true : radioStatus[1].checked = true;
};

// окно редактирования
obtainedDataFromEditPopup = () => {
	let obj = categories[indexEditing];
	let option;
	for (let i = 0; selectedCategory.length > i; i++) {
		if (selectedCategory[i].value == obj.name)
		option = selectedCategory[i];
	};

		obj.name = inputEditCategoryName.value;
		obj.status = radioStatus[0].checked ? 'income' : 'consumption';

	// изменяем текущий option
	// option.value = obj.name;
	option.textContent = obj.name;

	let childrens = existingCategories.children;
	let elem;
	for (let i = 0; childrens.length > i; i++) {
		let index = childrens[i].getAttribute('data-indexCategory');
		if (index == indexEditing) elem = childrens[i];
	};

	elem.classList.remove(elem.classList[0]);
	elem.classList.add(obj.status);
	elem.childNodes[0].data = obj.name;

	// console.log()
};


// для передачи атрибута из li>.btn-edit в popup
let keyEditingHistory;

// передаем данные в окно редактирования
editHistoryBtnHandler = e => {
	if (e.target.className != 'btn-edit' ) return;
	let history = mainObject.history;

	keyEditingHistory = e.target.parentElement.getAttribute('data-key');

  let itemHistObj;
  for (let i = 0; history.length > i; i++) {
    if (history[i].key == keyEditingHistory)
    itemHistObj = history[i];
  }

	selectEditHistoryName.value = itemHistObj.category.name;
	inputEditHistoryMoney.value = itemHistObj.money;
};

// сохраняем данные из popup для истории
let obtainedDataFromEditPopupHistory = () => {
	let histories = mainObject.history;
	// найти обьект с таким же keyEditingHistory

	let obj ; /*findIndex(mainObject.history, key, keyEditingHistory);*/
	for (let i = 0; histories.length > i; i++) {
		if (histories[i].key == keyEditingHistory)
		obj = histories[i];
	};


	let categoryId = selectEditHistoryName[selectEditHistoryName.selectedIndex].getAttribute('data-categoryid');
	for (let i = 0; mainObject.categories.length > i; i++) {
		if (mainObject.categories[i].id == categoryId)
		obj.category = mainObject.categories[i];
	}
	obj.money = inputEditHistoryMoney.value;

	let childrens = existingHistories.children;
	let elem;
	for (let i = 0; childrens.length > i; i++) {
		let keyElem = childrens[i].getAttribute('data-key');
		if (keyElem == keyEditingHistory) elem = childrens[i];
	};

	elem.classList.remove(elem.classList[0]);
	elem.classList.add(obj.category.status);
	// elem.childNodes[0].data = obj.category.name;
	elem.childNodes[0].innerHTML = obj.category.name;
	elem.childNodes[1].textContent = obj.money;

	mainObject.balance();
};


removeCategoryBtnHandler = e => {

  let target = e.target;
  if (target.className != 'btn-remove') return;
  let elemLi = target.parentElement;
  let indexRemoving = elemLi.getAttribute('data-indexcategory');
  mainObject.categories.splice(indexRemoving, 1);
  console.log(mainObject.categories);

  elemLi.remove();

  let options = selectedCategory.children;
	for ( let i = 0; options.length > i; i++ ) {
		options[i].value == elemLi.textContent ? options[i].remove() : false;
	};
};

let removeHistoryBtnHandler = e => {
	let target = e.target;
	if (target.className != 'btn-remove') return;
	let elemLi = target.parentElement;
	let att = elemLi.getAttribute('data-key');
	let hist = mainObject.history;
	// удаление из mainObject.history
	for (let i = 0; hist.length > i; i++) {
		if (hist[i].key == att) {
			hist.splice(i, 1)
		}
	};

	// удаление из DOM
	elemLi.remove();
	//обновляем баланс
	mainObject.balance();
};



// обработчики событий
categoryBtn.addEventListener('click', addCategoriHandler);
incomingBalance.addEventListener('click', changeBalance);
incomingBalance.addEventListener('click', mainObject.balance);
hidden.addEventListener('click', function(e) { wrapcategory.classList.toggle('toggleleft') });
historyBtn.addEventListener('click', function(e) { wraphistory.classList.toggle('toggleright') });
document.body.addEventListener('click', openPopup);
// openPopup обрабатывает только Attribute('data-popup')
// if (!e.target.getAttribute('data-popup')) return;

bgPopup.addEventListener('click', closeHandler);
bgPopup.addEventListener('click', clearInputs);

existingCategories.addEventListener('click', editCategoryBtnHandler);
existingCategories.addEventListener('click', removeCategoryBtnHandler);
btnEditCategorySave.addEventListener('click', obtainedDataFromEditPopup);

btnEditHistorySave.addEventListener('click', obtainedDataFromEditPopupHistory);
existingHistories.addEventListener('click', removeHistoryBtnHandler);
existingHistories.addEventListener('click', editHistoryBtnHandler);
