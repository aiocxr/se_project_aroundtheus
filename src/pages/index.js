// --------------------
// Imports
// --------------------
import "../vendor/fonts.css";
import "../pages/index.css";
import { config, initialCards } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js";

// --------------------
// DOM Elements
// --------------------
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.forms["profile-edit-form"];
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardForm = document.forms["add-card-form"];
const addNewCardButton = document.querySelector(".profile__add-button");
const cardListEl = document.querySelector(".cards__list");

// --------------------
// Functions
// --------------------
const handleImageClick = (cardData) => {
  previewPopup.open(cardData);
};

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView(cardData);
}

// --------------------
// Class Instances
// --------------------
// Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      return createCard(cardData);
    },
  },
  cardListEl
);

// User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Popups
const previewPopup = new PopupWithImage("#preview-modal");

const profilePopupForm = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      job: formData.description,
    });
    profilePopupForm.close();
    profilePopupForm.resetForm();
  }
);

const newCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  api
    .addCard({ name: formData.title, link: formData.link })
    .then((cardData) => {
      cardSection.renderCard(cardData);
      newCardPopup.close();
      newCardPopup.resetForm();
      addCardFormValidator.resetValidation();
    })
    .catch((err) => console.error(err));
});

// Validators
const addCardFormValidator = new FormValidator(config, addCardForm);
const editProfileFormValidator = new FormValidator(config, profileEditForm);

// --------------------
// Initialization
// --------------------
cardSection.renderItems();
previewPopup.setEventListeners();
profilePopupForm.setEventListeners();
newCardPopup.setEventListeners();
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cards.forEach((cardData) => {
      cardSection.renderCard(cardData);
    });
  })
  .catch((err) => console.error(err));

// --------------------
// Event Listeners
// --------------------
profileEditButton.addEventListener("click", () => {
  const { job, name } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  editProfileFormValidator.resetValidation();
  profilePopupForm.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
