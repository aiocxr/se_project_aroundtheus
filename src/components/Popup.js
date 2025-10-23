export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleEscKeyPress = this._handleEscKeyPress.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscKeyPress);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscKeyPress);
  }

  _handleEscKeyPress(evt) {
    if (
      evt.key === "Escape" &&
      this._popupElement.classList.contains("modal_opened")
    ) {
      evt.preventDefault();
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", this._handleOverlayClick);
    const closeButton = this._popupElement.querySelector(".modal__close");

    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }
  }
}
