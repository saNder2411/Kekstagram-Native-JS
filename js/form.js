'use strict';

(function () {
  var DEFAULT_VALUE = '100%';
  var form = window.picturesContainer.querySelector('.img-upload__form');
  var imageUploadInput = window.picturesContainer.querySelector('#upload-file');
  var imageForm = window.picturesContainer.querySelector('.img-upload__overlay');
  var imagePreview = imageForm.querySelector('.img-upload__preview img');
  var scaleValueInput = imageForm.querySelector('.scale__control--value');
  var slider = imageForm.querySelector('.effect-level');
  var imageFormClose = imageForm.querySelector('#upload-cancel');
  var effectRadioOriginal = imageForm.querySelector('.effects__radio:checked').value === 'none';

  window.form = {
    container: imageForm,
    imagePreview: imagePreview,
    scaleValueInput: scaleValueInput,
    slider: slider,
  };

  var onImageFormEscPress = function (evt) {
    window.util.doActionIfEscPressed(evt, hideImageForm);
  };

  var showImageForm = function () {
    imageForm.classList.remove('hidden');
    document.addEventListener('keydown', onImageFormEscPress);
    if (effectRadioOriginal) {
      slider.classList.add('hidden');
    }
    imagePreview.style = '';
    imagePreview.className = '';
    scaleValueInput.value = DEFAULT_VALUE;
  };

  var hideImageForm = function () {
    imageForm.classList.add('hidden');
    // imageUploadInput.value = '';
    form.reset();
    document.removeEventListener('keydown', onImageFormEscPress);
  };

  imageUploadInput.addEventListener('change', function () {
    showImageForm();
  });

  imageFormClose.addEventListener('click', function () {
    hideImageForm();
  });

  imageFormClose.addEventListener('keydown', function (evt) {
    window.util.doActionIfEnterOrSpacePressed(evt, hideImageForm);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var successHandler = function (response) {
      window.popups.showSuccess(response);
    };

    var errorHandler = function (errorMessage) {
      window.popups.showError(errorMessage);
    };
    window.backend.upload(new FormData(form), successHandler, errorHandler);
    hideImageForm();
  });
})();
