export default class Validate {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inacvtiveButtonClass = config._inacvtiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.error;

    this.form = config.formSelector;
  }
}






_setEventListeners() {
    this._inputEls = [...this.form.querySelectorAll(this._inputSelector)]
}


enableValidation() {
    this._formElement.addEventListener('submut', (e) {
        e.preventdefault();
    });
    this._setEventListeners(formElement, rest);
}