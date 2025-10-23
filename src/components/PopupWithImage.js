import Popup from "../components/Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".preview__modal-image");
    this._caption = this._popupElement.querySelector(".preview__modal-title");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }

  // setEventListeners() {
  //   super.setEventListeners();
  // }
}
