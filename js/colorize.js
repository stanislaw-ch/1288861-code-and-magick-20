'use strict';

(function () {

  /** Возвращает случайный цвет из массива
   * @param {array} array
   * @return {object} randColor
   */
  var getRrandColor = function (array) {
    var randColor = array[Math.floor(array.length * Math.random())];

    return randColor;
  };

  window.colorize = function (element, elementColor, elementValue) {
    element.addEventListener('click', function () {
      var color = getRrandColor(elementColor);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
        elementValue.value = color;
      }
    });
  };
})();
