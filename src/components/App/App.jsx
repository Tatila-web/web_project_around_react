import { useState, useEffect } from "react";
import Header from "@components/Header/Header.jsx";
import Main from "@components/Main/Main.jsx";
import Footer from "@components/Footer/Footer.jsx";
import { api } from "@utils/api.js";
import { CurrentUserContext } from "@contexts/CurrentUserContext.js";

// Popups
import Popup from "@componentsMain/Popup/Popup.jsx";
import EditProfile from "@componentsMain/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "@componentsMain/Popup/EditAvatar/EditAvatar.jsx";
import NewCard from "@componentsMain/Popup/NewCard/NewCard.jsx";
import RemoveCard from "@componentsMain/Popup/RemoveCard/RemoveCard.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [cardToRemove, setCardToRemove] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.error);
    api.getInitialCards().then(setCards).catch(console.error);
  }, []);

  // Curtir/descurtir card
  const handleCardLike = async (card) => {
    await api.changeLikeCardStatus(card._id, !card.isLiked);
    setCards((state) =>
      state.map((c) => (c._id === card._id ? { ...c, isLiked: !c.isLiked } : c))
    );
  };

  // Abrir/fechar popups
  const openPopupByKey = (key) => setSelectedPopup({ key });
  const openImagePopup = (card) => setSelectedPopup({ type: "image", card });
  const closePopup = () => setSelectedPopup(null);

  // Adicionar card
  const handleAddPlace = async (data) => {
    try {
      const newCard = await api.addCard(data);
      setCards((state) => [newCard, ...state]);
      closePopup();
    } catch (err) {
      console.error(err);
    }
  };

  // Atualizar perfil
  const handleUpdateUser = async (data) => {
    try {
      const updatedUser = await api.setUserInfo(data);
      setCurrentUser(updatedUser);
      closePopup();
    } catch (err) {
      console.error(err);
    }
  };

  // Atualizar avatar
  const handleUpdateAvatar = async (avatar) => {
    try {
      const updatedUser = await api.updateAvatar(avatar);
      setCurrentUser(updatedUser);
      closePopup();
    } catch (err) {
      console.error(err);
    }
  };

  // Remover card
  const handleOpenRemoveCard = (card) => setCardToRemove(card);
  const handleCloseRemoveCard = () => {
    setCardToRemove(null);
    setIsRemoving(false);
  };
  const handleConfirmRemoveCard = async () => {
    if (!cardToRemove) return;
    setIsRemoving(true);
    try {
      await api.deleteCard(cardToRemove._id);
      setCards((state) => state.filter((c) => c._id !== cardToRemove._id));
      handleCloseRemoveCard();
    } catch (err) {
      console.error(err);
      setIsRemoving(false);
    }
  };

  if (!currentUser.name) return <p>Carregando...</p>;

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleOpenRemoveCard}
          openPopupByKey={openPopupByKey}
          openImagePopup={openImagePopup}
        />
        <Footer />

        {/* Popups */}
        {selectedPopup?.key === "editProfile" && (
          <Popup title="Editar Perfil" onClose={closePopup} isOpen>
            <EditProfile onUpdateUser={handleUpdateUser} onClose={closePopup} />
          </Popup>
        )}

        {selectedPopup?.key === "editAvatar" && (
          <Popup title="Editar Avatar" onClose={closePopup} isOpen>
            <EditAvatar
              onUpdateAvatar={handleUpdateAvatar}
              onClose={closePopup}
            />
          </Popup>
        )}

        {selectedPopup?.key === "newCard" && (
          <Popup title="Novo Card" onClose={closePopup} isOpen>
            <NewCard onAddPlace={handleAddPlace} onClose={closePopup} />
          </Popup>
        )}

        {selectedPopup?.type === "image" && (
          <Popup onClose={closePopup} isOpen>
            <img
              src={selectedPopup.card.link}
              alt={selectedPopup.card.name}
              className="popup__image"
            />
            <p className="popup__caption">{selectedPopup.card.name}</p>
          </Popup>
        )}

        {/* Remove Card */}
        {cardToRemove && (
          <RemoveCard
            isOpen={!!cardToRemove}
            onClose={handleCloseRemoveCard}
            onConfirmDelete={handleConfirmRemoveCard}
            isRemoving={isRemoving}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
