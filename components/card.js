export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this.link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._toggleLikeButton();
      });

    this._cardElement
      .querySelector(".cards__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _toggleLikeButton() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    this._setEventListeners();
  }
}
