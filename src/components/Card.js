export default class Card {
  constructor(
    { link, name, _id, _isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    api
  ) {
    console.log(_id);

    this._link = link;
    this._name = name;
    this._cardId = _id;
    this._isLiked = _isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._api = api;

    console.log(this._cardId);
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
    console.log(this._cardId);

    if (this._isLiked) {
      this._api
        .unlikeCard(this._cardId)
        .then(() => {
          this._likeButton.classList.remove("cards__like-button_active");
          this._isLiked = false;
        })
        .catch((err) => console.error(err));
    } else {
      this._api
        .likeCard(this._cardId)
        .then(() => {
          this._isLiked = true;
          this._likeButton.classList.add("cards__like-button_active");
        })
        .catch((err) => console.error(err));
    }
  }

  _handleDeleteButton() {
    this._handleDeleteClick(this._cardId, this._cardElement);
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

    // Set initial like state
    if (this._isLiked) {
      this._likeButton.classList.add("cards__like-button_active");
    }

    return this._cardElement;
  }
}
