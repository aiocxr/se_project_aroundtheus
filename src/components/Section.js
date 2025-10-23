export default class Section {
  constructor({ items, renderer }, cardListEl) {
    this._items = items;
    this._renderer = renderer;
    this._cardlistel = cardListEl;
  }

  renderItems() {
    // renders items to the page
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._cardlistel.prepend(item);
  }
}
