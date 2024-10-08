export default class Validate {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inacvtiveButtonClass = config._inacvtiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.error;

    this._form = config.formElement;
  }

  _toggleButtonState() {}

  _hasInvalidInput() {}

  _checkInputValidity() {}

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _setEventListeners() {
    this._inputEls = Array.form(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        checkInputValidity();
        showInputError();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventdefault();
    });
    this._setEventListeners(formElement, rest);
  }
}
