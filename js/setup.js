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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

document.querySelector('.setup-similar').classList.remove('hidden');
