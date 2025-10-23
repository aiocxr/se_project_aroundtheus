export default class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
  }

  _showInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._settings.errorClass);
  }

  _toggleButtonState(inputEls) {
    if (this._hasInvalidInput(inputEls)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners(formEl) {
    const inputEls = [...formEl.querySelectorAll(this._settings.inputSelector)];
    const submitButton = formEl.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState(inputEls, submitButton);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(formEl, inputEl);
        this._toggleButtonState(inputEls, submitButton);
      });
    });
  }

  _checkInputValidity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(formEl, inputEl);
    }
    this._hideInputError(formEl, inputEl);
  }

  disableSubmitButton() {
    const submitButton = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );
    if (!submitButton) {
      console.error("disableSubmitButton: submitButton not found.");
      return;
    }
    submitButton.classList.add(this._settings.inactiveButtonClass);
    submitButton.disabled = true;
  }

  enableSubmitButton() {
    const submitButton = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );
    if (!submitButton) {
      console.error("enableSubmitButton: submitButton not found.");
      return;
    }
    submitButton.classList.remove(this._settings.inactiveButtonClass);
    submitButton.disabled = false;
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formEl);
  }

  enableSubmitButton() {
    const submitButton = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );
    if (!submitButton) {
      console.error("enableSubmitButton: submitButton not found.");
      return;
    }
    submitButton.classList.remove(this._settings.inactiveButtonClass);
    submitButton.disabled = false;
  }

  resetValidation() {
    const inputEls = [
      ...this._formEl.querySelectorAll(this._settings.inputSelector),
    ];
    const submitButton = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );

    inputEls.forEach((inputEl) => {
      this._hideInputError(this._formEl, inputEl);
    });

    if (submitButton) {
      this._toggleButtonState(inputEls, submitButton);
    }
  }
}
