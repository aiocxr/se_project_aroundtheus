export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    // returns an object containing information about the user
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job, avatar }) {
    // takes new user data and adds it to the page
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (avatar) this._avatarElement.src = avatar;
  }
}
