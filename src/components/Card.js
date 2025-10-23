export default class Card {
  constructor({ link, name }, cardSelector, handleImageClick) {
    this._link = link;
    this._name = name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () =>
        this._handleLikeButton(this._cardElement)
      );
    this._cardElement
      .querySelector(".cards__trash-button")
      .addEventListener("click", () =>
        this._handleDeleteButton(this._cardElement)
      );
    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards")
      .cloneNode(true);

    this._setEventListeners();

    const cardImageEl = this._cardElement.querySelector(".cards__image");
    const cardTitleEl = this._cardElement.querySelector(".cards__title");

    cardImageEl.src = this._link;
    cardTitleEl.textContent = this._name;
    cardImageEl.alt = "Photo of " + this._name;

    return this._cardElement;
  }
}
