import { useState, useEffect } from "react";
import Header from "@components/Header/Header";
import Main from "@components/Main/Main";
import Footer from "@components/Footer/Footer";
import { api } from "@utils/api";
import { CurrentUserContext } from "@contexts/CurrentUserContext";

// Popups
import Popup from "@componentsMain/Popup/Popup";
import ImagePopup from "@componentsMain/Popup/components/ImagePopup/ImagePopup";
import EditProfile from "@componentsMain/Popup/components/EditProfile/EditProfile";
import EditAvatar from "@componentsMain/Popup/components/EditAvatar/EditAvatar";
import NewCard from "@componentsMain/Popup/components/NewCard/NewCard";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [cardToRemove, setCardToRemove] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Normaliza cards
  const normalizeCard = (card) => ({
    ...card,
    owner: card.owner._id || card.owner,
    likes: (card.likes || []).map((l) => l._id || l),
    isLiked: card.likes?.some((id) => id === currentUser._id) || false,
  });

  // Carregar dados iniciais
  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.error);
    api
      .getInitialCards()
      .then((data) => setCards(data.map(normalizeCard)))
      .catch(console.error);
  }, []);

  // Atualizar perfil
  const handleUpdateUser = (data) =>
    api.setUserInfo(data).then(setCurrentUser).catch(console.error);

  // Atualizar avatar
  const handleUpdateAvatar = async ({ avatar }) => {
    try {
      const updatedUser = await api.updateAvatar(avatar);
      setCurrentUser(updatedUser);
    } catch (err) {
      console.error("Erro ao atualizar avatar:", err);
    }
  };

  // Adicionar card
  const handleAddPlace = async (data) => {
    try {
      const newCard = await api.addCard(data);
      setCards((state) => [normalizeCard(newCard), ...state]);
    } catch (err) {
      console.error(err);
    }
  };

  // Curtir/descurtir card (apenas altera isLiked)
  const handleCardLike = async (card) => {
    try {
      // Alterna o like na API
      await api.changeLikeCardStatus(card._id, !card.isLiked);

      // Atualiza estado local apenas com o booleano
      setCards((state) =>
        state.map((c) =>
          c._id === card._id ? { ...c, isLiked: !c.isLiked } : c
        )
      );
    } catch (err) {
      console.error("Erro ao curtir/descurtir card:", err);
    }
  };

  // Abrir/fechar popups
  const openPopupByKey = (key) => setSelectedPopup({ key });
  const openImagePopup = (card) => setSelectedPopup({ type: "image", card });
  const closePopup = () => setSelectedPopup(null);

  // Exclusão de card
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

  if (!currentUser || !currentUser.name) return <p>Carregando...</p>;

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
          <Popup
            title="Editar Perfil"
            onClose={closePopup}
            type="profile"
            isOpen
          >
            <EditProfile onUpdateUser={handleUpdateUser} onClose={closePopup} />
          </Popup>
        )}

        {selectedPopup?.key === "editAvatar" && (
          <Popup
            title="Editar Avatar"
            onClose={closePopup}
            type="avatar"
            isOpen
          >
            <EditAvatar onClose={closePopup} />
          </Popup>
        )}

        {selectedPopup?.key === "newCard" && (
          <Popup title="Novo Card" onClose={closePopup} type="profile" isOpen>
            <NewCard onAddPlace={handleAddPlace} onClose={closePopup} />
          </Popup>
        )}

        {selectedPopup?.type === "image" && (
          <ImagePopup card={selectedPopup.card} onClose={closePopup} />
        )}

        {cardToRemove && (
          <Popup
            title="Excluir este card?"
            type="remove-card"
            isOpen
            onClose={handleCloseRemoveCard}
          >
            <button
              className="popup__confirm-submit-button"
              onClick={handleConfirmRemoveCard}
              disabled={isRemoving}
            >
              {isRemoving ? "Excluindo..." : "Sim, excluir"}
            </button>
          </Popup>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
