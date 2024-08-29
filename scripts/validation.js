function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function enableValidation(options) {
  const { formSelector } = options;
  const formEls = [...document.querySelectorAll(formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }

  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

const checkInputValidity = (formEl, inputEl, options) => {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
