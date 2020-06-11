'use strict';

// Содержит имена персонажей
var WIZARD_FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

// Содержит фамилии персонажей
var WIZARD_SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

// Содержит цвет мантии персонажей
var WIZARD_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

// Содержит цвет глаз персонажей
var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Содержит цвет фаерболов
var WIZARD_FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open-icon');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');

var setupWizard = document.querySelector('.setup-wizard');
var setupWizardCoatColor = setupWizard.querySelector('.wizard-coat');
var setupWizardEyesColor = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireballColor = document.querySelector('.setup-fireball');
var inputCoatValue = document.querySelector('input[name="coat-color"]');
var inputEyesValue = document.querySelector('input[name="eyes-color"]');
var inputFireballValue = document.querySelector('input[name="fireball-color"]');

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && !userNameInput.focused) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

/**
 * Возвращает случайное число относительно длины массива
 * @param {array} wizard
 *
 * @return {number} randNumber
 */
var getRandNumber = function (wizard) {
  var randNumber = Math.floor(Math.random() * wizard.length);

  return randNumber;
};

/**
 * Возвращает массив со случайным прорядком элементов массива
 * @param {array} wizard
 *
 * @return {array} array
 */
var getArr = function (wizard) {
  var array = [];
  for (var i = 0; i < wizard.length; i++) {
    var j = wizard[getRandNumber(wizard)];
    array = [j];
  }

  return array;
};

// Содержит массив, состоящий из 4-х сгенерированных JS объектов
var wizards = [
  {
    firstName: getArr(WIZARD_FIRST_NAMES),
    secondName: getArr(WIZARD_SECOND_NAMES),
    coatColor: getArr(WIZARD_COAT_COLOR),
    eyesColor: getArr(WIZARD_EYES_COLOR)
  },
  {
    firstName: getArr(WIZARD_FIRST_NAMES),
    secondName: getArr(WIZARD_SECOND_NAMES),
    coatColor: getArr(WIZARD_COAT_COLOR),
    eyesColor: getArr(WIZARD_EYES_COLOR)
  },
  {
    firstName: getArr(WIZARD_FIRST_NAMES),
    secondName: getArr(WIZARD_SECOND_NAMES),
    coatColor: getArr(WIZARD_COAT_COLOR),
    eyesColor: getArr(WIZARD_EYES_COLOR)
  },
  {
    firstName: getArr(WIZARD_FIRST_NAMES),
    secondName: getArr(WIZARD_SECOND_NAMES),
    coatColor: getArr(WIZARD_COAT_COLOR),
    eyesColor: getArr(WIZARD_EYES_COLOR)
  }
];

/**
 * Отрисовывает карточку с магом
 * @param {array} wizard
 *
 * @return {array} wizardElement
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  var name = wizard.firstName + ' ' + wizard.secondName;

  wizardElement.querySelector('.setup-similar-label').textContent = name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Содержит пустой фрагмент
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// document.querySelector('.setup-similar').classList.remove('hidden');

var getRrandColor = function (array) {
  var randColor = getArr(array);
  return randColor;
};

setupWizardCoatColor.addEventListener('click', function () {
  var color = getRrandColor(WIZARD_COAT_COLOR);
  setupWizardCoatColor.style.fill = color;
  inputCoatValue.value = color;

  // console.log(inputCoatValue.value);
  // console.log(setupWizardCoatColor.style.fill);
});

setupWizardEyesColor.addEventListener('click', function () {
  var color = getRrandColor(WIZARD_EYES_COLOR);
  setupWizardEyesColor.style.fill = color;
  inputEyesValue.value = color;

  // console.log(inputEyesValue.value);
  // console.log(setupWizardEyesColor.style.fill);
});

setupWizardFireballColor.addEventListener('click', function () {
  var color = getRrandColor(WIZARD_FIREBALL_COLOR);

  setupWizardFireballColor.setAttribute('style', 'background-color:' + color);
  inputFireballValue.value = color;
});
