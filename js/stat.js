'use strict';

// Содержит ширину облака
var CLOUD_WIDTH = 420;
// Содержит высоту облака
var CLOUD_HEIGHT = 270;
// Содержит значение облака по оси Х
var CLOUD_X = 100;
// Содержит значение облака по оси Y
var CLOUD_Y = 10;
// Содержит отступ между элементами
var GAP = 40;
// Содержит отступ от текста
var FONT_GAP = 20;
// Содержит высоту гистограммы
var barHeight = -150 + GAP / 2;
// Содержит ширину гистограммы
var BAR_WIDTH = 40;

/**
  * Отрисовывает прямоугольник по заданным параметрам
  * @param {object} ctx
  * @param {number} x
  * @param {number} y
  * @param {*} color
  */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Возвращает максимальный елемент массива
 * @param {array} arr
 * @return {number} Значение максимального елемента массива
 */
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/**
 * Возвращает случайное число в заданном интервале
 * @param {number} min
 * @param {number} max
 *
 * @return {number} Случайное число
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Отрисовывает график статистики прохождения уровня по времени
 * @param {object} ctx
 * @param {array} players
 * @param {array} times
 */
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP / 4, CLOUD_Y + GAP / 4, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';

  ctx.fillText('Ура вы победили!', CLOUD_X + GAP / 2, GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP / 2, GAP + GAP / 2);

  // Содержит значение максимального елемента массива
  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(
        players[i],
        CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
        CLOUD_HEIGHT - GAP / 2
    );

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(
          CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
          CLOUD_HEIGHT - GAP,
          BAR_WIDTH,
          (barHeight * times[i]) / maxTime
      );
      ctx.fillStyle = '#000';
      ctx.fillText(
          Math.round(times[i]),
          CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
          CLOUD_HEIGHT - GAP - FONT_GAP + (barHeight * times[i]) / maxTime
      );
    } else {
      ctx.fillStyle = 'hsl(240,' + getRandomInt(0, 50) + '%, 50%)';
      ctx.fillRect(
          CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
          CLOUD_HEIGHT - GAP,
          BAR_WIDTH,
          (barHeight * times[i]) / maxTime
      );
      ctx.fillStyle = '#000';
      ctx.fillText(
          Math.round(times[i]),
          CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
          CLOUD_HEIGHT - GAP - FONT_GAP + (barHeight * times[i]) / maxTime
      );
    }
  }
};
