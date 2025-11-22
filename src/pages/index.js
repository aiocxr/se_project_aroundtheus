// --------------------
// Imports
// --------------------
import "../vendor/fonts.css";
import "../pages/index.css";
import { config } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
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
const confirmationYesButton = document.querySelector(
  "#confirmation-yes-button"
);
const confirmationPopup = new Popup("#confirmation-modal");

// Store which card is being deleted
let cardToDelete = null;

// --------------------
// Functions
// --------------------
const handleImageClick = (cardData) => {
  previewPopup.open(cardData);
};

const handleDeleteClick = (cardId, cardElement) => {
  // Store the card info and open confirmation modal
  cardToDelete = { id: cardId, element: cardElement };
  confirmationPopup.open();
};

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick
  );
  return card.getView();
}

// --------------------
// Class Instances
// --------------------
// Section
const cardSection = new Section(
  {
    items: [],
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
    api
      .updateUserInfo({
        name: formData.title,
        about: formData.description,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
        });
        profilePopupForm.close();
        profilePopupForm.resetForm();
      })
      .catch((err) => console.error(err));
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
previewPopup.setEventListeners();
profilePopupForm.setEventListeners();
newCardPopup.setEventListeners();
confirmationPopup.setEventListeners();
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// Load user info from API
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
  })
  .catch((err) => console.error(err));

// Load cards from API
api
  .getInitialCards()
  .then((cards) => {
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

confirmationYesButton.addEventListener("click", () => {
  if (cardToDelete) {
    api
      .deleteCard(cardToDelete.id)
      .then(() => {
        cardToDelete.element.remove();
        cardToDelete = null;
        confirmationPopup.close();
      })
      .catch((err) => console.error(err));
  }
});
