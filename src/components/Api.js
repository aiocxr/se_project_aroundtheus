class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    // ...
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d451ff55-09b9-4df3-9958-ac0ceaecce63",
    "Content-Type": "application/json",
  },
});

export default api;

