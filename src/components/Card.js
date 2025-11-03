export default class Card {
  constructor({ link, name }, cardSelector, handleImageClick) {
    this._link = link;
    this._name = name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._trashButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("cards__like-button_active");
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

    // Cache DOM elements
    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._trashButton = this._cardElement.querySelector(".cards__trash-button");
    this._imageElement = this._cardElement.querySelector(".cards__image");
    this._titleElement = this._cardElement.querySelector(".cards__title");

    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = `Photo of ${this._name}`;
    this._titleElement.textContent = this._name;

    return this._cardElement;
  }
}
