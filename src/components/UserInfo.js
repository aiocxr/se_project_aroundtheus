export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    // returns an object containing information about the user
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    // takes new user data and adds it to the page
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
  }
}
