import React from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  // решил добавить индикаторы загрузки запросов в виде изменения текста внутри сабмит-баттона :)
  const [profileSumitionButtonText, setProfileSumitionButtonText] = React.useState("Сохранить");
  const [avatarSumitionButtonText, setAvatarSumitionButtonText] = React.useState("Сохранить");
  const [placeSumitionButtonText, setPlaceSumitionButtonText] = React.useState("Создать");

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });

    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({name, about}) {
    setProfileSumitionButtonText("Сохранение...");

    api.editUserInfo({name, about})
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        setProfileSumitionButtonText("Сохранить");
      })
      .catch((err) => {
        console.log(err);
        setProfileSumitionButtonText("Сохранить");
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    setPlaceSumitionButtonText("Создание...");

    api.addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setPlaceSumitionButtonText("Создать");
      })
      .catch((err) => {
        console.log(err);
        setPlaceSumitionButtonText("Создать");
      });
  }

  function handleUpdateAvatar({avatar}) {
    setAvatarSumitionButtonText("Сохранение...");

    api.editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        setAvatarSumitionButtonText("Сохранить");
      })
      .catch((err) => {
        console.log(err);
        setAvatarSumitionButtonText("Сохранить");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />

        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} buttonText={profileSumitionButtonText} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} buttonText={placeSumitionButtonText} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} buttonText={avatarSumitionButtonText} />
        {/* <PopupWithForm name="confirmation" title="Вы уверены?" buttonText="Да" /> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
