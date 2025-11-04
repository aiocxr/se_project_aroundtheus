export default class Section {
  constructor({ items, renderer }, cardListEl) {
    this._items = items;
    this._renderer = renderer;
    this._cardListEl = cardListEl;
  }

  renderCard(cardData) {
    const cardElement = this._renderer(cardData);
    this.addItem(cardElement);
  }

  renderItems() {
    // renders items to the page
    this._items.forEach((item) => {
      this.renderCard(item);
    });
  }

  addItem(item) {
    this._cardListEl.prepend(item);
  }
}
