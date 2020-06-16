'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var userDialog = document.querySelector('.setup');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardCoatColor = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyesColor = setupWizard.querySelector('.wizard-eyes');
  var setupWizardFireballColor = document.querySelector('.setup-fireball');
  var inputCoatValue = document.querySelector('input[name="coat-color"]');
  var inputEyesValue = document.querySelector('input[name="eyes-color"]');
  var inputFireballValue = document.querySelector('input[name="fireball-color"]');

  var fragment = document.createDocumentFragment();

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

  for (var i = 0; i < window.wizardsData.wizards.length; i++) {
    fragment.appendChild(renderWizard(window.wizardsData.wizards[i]));
  }

  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');

  window.colorize(setupWizardCoatColor, window.wizardsData.COAT_COLOR, inputCoatValue);
  window.colorize(setupWizardEyesColor, window.wizardsData.EYES_COLOR, inputEyesValue);
  window.colorize(setupWizardFireballColor, window.wizardsData.FIREBALL_COLOR, inputFireballValue);
})();
