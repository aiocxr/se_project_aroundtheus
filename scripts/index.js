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

console.log(initialCards);

// PROFILE ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeProfileModalButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditForm = profileEditModal.querySelector(".modal__form");

// ADD BUTTON ELEMENTS

const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const addNewCardButton = document.querySelector(".profile__add-button");
const closeAddModalButton = addCardModal.querySelector("#modal-add-button");

// CARD ELEMENTS

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// FORM DATA
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Card Element Function to create card element from card data object and return card element to render card

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

// Key Functions for Modal

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
// Event Handlers for Profile and Add Card Modal

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListEl.prepend(cardElement);
  closeModal(addCardModal);
}

// Event Listeners for Profile and Add Card Modal

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

closeProfileModalButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

closeAddModalButton.addEventListener("click", () => closeModal(addCardModal));

// Form Submit Event Listeners for profile and card

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Cards function to Render Cards from initial cards array

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

// Cards like button function and event listener for like button

const likeButtons = document.querySelectorAll(".cards__like-button");

likeButtons.forEach((likebutton) => {
  likebutton.addEventListener("click", () => {
    likebutton.classList.toggle("cards__like-button_active");
  });
});

// Preview Elements

const previewModal = document.querySelector("#preview-modal");
const modalImg = previewModal.querySelector("#modal-image");
const closePreviewModalButton = previewModal.querySelector(
  "#preview-modal-close-button"
);
const images = previewModal.querySelector(".preview__image");

// function to open modal and display image

function openModal(src) {
  previewModal.style.display = "block";
  modalImg.src = src;
}

// Images Event Listener to display image in modal

images.forEach((image) => {
  image.addEventListener("click", () => {
    openModal(image.src);
  });
});
