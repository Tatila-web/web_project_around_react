import { useState, useEffect } from "react";
import Header from "@components/Header/Header.jsx";
import Main from "@components/Main/Main.jsx";
import Footer from "@components/Footer/Footer.jsx";
import { api } from "@utils/api.js";
import { CurrentUserContext } from "@contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [cardToRemove, setCardToRemove] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        return api.getInitialCards().then((cardsData) =>
          cardsData.map((card) => ({
            ...card,
            _id: card._id || card.id,
            owner: card.owner._id || card.owner,
            isLiked: card.likes?.some((id) => id === user._id) || false,
          }))
        );
      })
      .then((normalizedCards) => setCards(normalizedCards))
      .catch(console.error);
  }, []);

  // Curtir/descurtir card
  const handleCardLike = async (card) => {
    if (!card._id) return;
    try {
      await api.changeLikeCardStatus(card._id, !card.isLiked);
      const updatedCard = { ...card, isLiked: !card.isLiked };
      setCards((state) =>
        state.map((c) => (c._id === card._id ? updatedCard : c))
      );
      return updatedCard;
    } catch (err) {
      console.error("Erro ao curtir/descurtir card:", err);
    }
  };

  // Abrir/fechar popups
  const openPopupByKey = (key) => setSelectedPopup({ key });
  const openImagePopup = (card) => setSelectedPopup({ type: "image", card });
  const closePopup = () => {
    setSelectedPopup(null);
    setCardToRemove(null);
  };

  // Adicionar card
  const handleAddPlace = async (data) => {
    try {
      const newCard = await api.addCard(data);
      setCards((state) => [
        { ...newCard, _id: newCard._id || newCard.id, isLiked: false },
        ...state,
      ]);
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
  const handleConfirmRemoveCard = async () => {
    if (!cardToRemove) return;
    setIsRemoving(true);
    try {
      await api.deleteCard(cardToRemove._id);
      setCards((state) => state.filter((c) => c._id !== cardToRemove._id));
      closePopup();
      setIsRemoving(false);
    } catch (err) {
      console.error(err);
      setIsRemoving(false);
    }
  };

  if (!currentUser) return <p>Carregando...</p>;

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlace,
      }}
    >
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleOpenRemoveCard}
          openPopupByKey={openPopupByKey}
          openImagePopup={openImagePopup}
          selectedPopup={selectedPopup}
          closePopup={closePopup}
          cardToRemove={cardToRemove}
          handleConfirmRemoveCard={handleConfirmRemoveCard}
          isRemoving={isRemoving}
          handleAddPlace={handleAddPlace} // <- prop passada pro Main
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
