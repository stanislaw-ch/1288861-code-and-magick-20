'use strict';

(function () {
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

  var WIZARD_NUMBER = 4;

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

  var wizardsArray = function (n) {
    var wizards = [];
    for (var i = 0; i < n; i++) {
      wizards[i] = {
        firstName: getArr(WIZARD_FIRST_NAMES),
        secondName: getArr(WIZARD_SECOND_NAMES),
        coatColor: getArr(WIZARD_COAT_COLOR),
        eyesColor: getArr(WIZARD_EYES_COLOR)
      };
    }
    return wizards;
  };

  window.wizardsData = {
    wizards: wizardsArray(WIZARD_NUMBER),
    COAT_COLOR: WIZARD_COAT_COLOR,
    EYES_COLOR: WIZARD_COAT_COLOR,
    FIREBALL_COLOR: WIZARD_FIREBALL_COLOR,
  };
})();
