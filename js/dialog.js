'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open-icon');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var dialogHandle = userDialog.querySelector('.upload');

  var setupWizardFireballColor = document.querySelector('.setup-fireball');
  var inputFireballValue = document.querySelector('input[name="fireball-color"]');

  var form = userDialog.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {
    if (!userNameInput.focused) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');

    userDialog.style.top = 80 + 'px';
    userDialog.style.left = 50 + '%';

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
    window.util.isEnterEvent(evt, closePopup);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  window.wizard.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), errorHandler, function () {

      userDialog.classList.add('hidden');
      window.avatar.defaultAvatar();
    });
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);

  window.colorize(setupWizardFireballColor, window.wizard.FIREBALL_COLOR, inputFireballValue);
})();
