// --------------------
// Imports
// --------------------
import "../vendor/fonts.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

// --------------------
// Configuration
// --------------------
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// --------------------
// Initial Data
// --------------------
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
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
    profileTitle.textContent = formData.title;
    profileDescription.textContent = formData.description;

    userInfo.setUserInfo({
      name: formData.title,
      job: formData.description,
    });

    profilePopupForm.close();
  }
);

const newCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const newCard = createCard({ name: formData.title, link: formData.url });
  cardSection.addItem(newCard);
  newCardPopup.close();
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
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editProfileFormValidator.resetValidation();
  profilePopupForm.open();
});
closeProfileModalButton.addEventListener("click", () =>
  profilePopupForm.close()
);

// Add Card
addNewCardButton.addEventListener("click", () => {
  addCardForm.reset();
  addCardFormValidator.disableSubmitButton();
  newCardPopup.open();
});
closeAddModalButton.addEventListener("click", () => newCardPopup.close());
