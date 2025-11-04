// --------------------
// Imports
// --------------------
import "../vendor/fonts.css";
import { config, initialCards } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

// --------------------
// DOM Elements
// --------------------
// Profile
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeProfileModalButton = profileEditModal.querySelector(
  "#profile-modal-close-button"
);
const profileEditForm = document.forms["profile-edit-form"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Add Card
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
const closeAddModalButton = addCardModal.querySelector(
  "#add-modal-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");

// Cards List
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
  cardSection.renderCard({
    name: formData.title,
    link: formData.link,
  });
  newCardPopup.close();
  newCardPopup.resetForm();
  addCardFormValidator.resetValidation();
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

// --------------------
// Event Listeners
// --------------------
// Profile Edit
profileEditButton.addEventListener("click", () => {
  const { job, name } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  editProfileFormValidator.resetValidation();
  profilePopupForm.open();
});

// Add Card
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
closeAddModalButton.addEventListener("click", () => newCardPopup.close());
