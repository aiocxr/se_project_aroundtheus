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

// PROFILE ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeProfileModalButton = profileEditModal.querySelector(
  "#profile-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.forms["profile-edit-form"];

// ADD BUTTON ELEMENTS

const addCardModal = document.querySelector("#add-card-modal");
// const addCardForm = document.querySelector("#add-card-form");
const addCardForm = document.forms["add-card-form"];
const addNewCardButton = document.querySelector(".profile__add-button");
const closeAddModalButton = addCardModal.querySelector("#modal-add-button");
// =
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  "#preview-modal-close-button"
);

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

// Cards function to Render Cards from initial cards array

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

// Card Element Function to create card element from card data object and return card element to render card

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__trash-button");
  // const previewModal = document.querySelector("#preview-modal");
  const previewModalImage = previewModal.querySelector(".preview__image");
  const previewModalTitle = previewModal.querySelector(".preview__title");
  // const previewModalCloseButton = previewModal.querySelector(
  //   "#preview-modal-close-button"
  // );
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });

  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".cards").remove();
  });
  // previewModalCloseButton.addEventListener("click", () => {
  //   closeModal(previewModal);
  // });

  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = "Photo of " + cardData.name;
  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = cardData.link;
    previewModalImage.alt = cardData.name;
    previewModalTitle.textContent = cardData.name;
  });

  return cardElement;
}

// KEY FUNCTIONS TO OPEN AND CLOSE

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
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

// Event Listeners for Profile & Add Card Modal & Preview Modal

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

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

// Form Submit Event Listeners for profile and card

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// function closeModal() {
//   const modal = document.querySelector(".modal_opened");
//   if (modal) {
//     modal.classList.remove("modal_opened");
//   }
// }

function closeActiveModals() {
  const modal = document.querySelector(".modal_opened");
  const previewModal = document.querySelector("#preview-modal");
  if (modal) {
    closeModal(modal);
  }
  if (previewModal) {
    closeModal(previewModal);
  }
}

function handleKeydown(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    const previewModal = document.querySelector("#preview-modal");
    if (modal) {
      closeModal(modal);
    }
    if (previewModal) {
      closeModal(previewModal);
    }
  }
}

function handleClick(evt) {
  const modal = document.querySelector(".modal_opened");
  const previewModal = document.querySelector("#preview-modal");
  if (
    (modal && evt.target === modal) ||
    (previewModal && evt.target === previewModal)
  ) {
    closeActiveModals();
    removeEventListeners();
  }
}

document.addEventListener("keydown", handleKeydown);
document.addEventListener("click", handleClick);

function removeEventListeners() {
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleClick);
}

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (evt) {
  const modal = document.querySelector(".modal_opened");
  if (modal && evt.target === modal) {
    closeModal();
  }
});
