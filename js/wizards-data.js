'use strict';

(function () {
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

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoatElement = setupWizard.querySelector('.wizard-coat');
  var wizardEyesElement = setupWizard.querySelector('.wizard-eyes');

  /**
   * Возвращает случайное число относительно длины массива
   * @param {array} array
   *
   * @return {number} randNumber
   */
  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };

  wizardCoatElement.addEventListener('click', function () {
    var newColor = getRandomElement(WIZARD_COAT_COLOR);
    wizardCoatElement.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = getRandomElement(WIZARD_EYES_COLOR);
    wizardEyesElement.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = {
    FIREBALL_COLOR: WIZARD_FIREBALL_COLOR,
    wizard: wizard
  };
})();
