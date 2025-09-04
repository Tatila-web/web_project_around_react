import React, { useContext } from "react";
import Card from "@componentsMain/Card/Card.jsx";
import { CurrentUserContext } from "@contexts/CurrentUserContext.js";
import Popup from "@componentsMain/Popup/Popup.jsx";
import EditProfile from "@componentsMain/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "@componentsMain/Popup/EditAvatar/EditAvatar.jsx";
import NewCard from "@componentsMain/Popup/NewCard/NewCard.jsx";
import ImagePopup from "@componentsMain/Popup/ImagePopup/ImagePopup.jsx";
import RemoveCard from "@componentsMain/Popup/RemoveCard/RemoveCard.jsx";

// Ícones
import profileEditIcon from "@images/vetores/Vector_profile-info.png";
import addButtonIcon from "@images/vetores/Vector_addButton.png";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  openPopupByKey,
  openImagePopup,
  selectedPopup,
  closePopup,
  cardToRemove,
  handleConfirmRemoveCard,
  isRemoving,
  handleAddPlace, // <- Recebendo a função do App.jsx
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const safeUser = currentUser || { _id: "", name: "", about: "", avatar: "" };

  return (
    <main className="content">
      {/* Perfil */}
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={safeUser.avatar || null}
            alt={`Foto de perfil de ${safeUser.name}`}
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            onClick={() => openPopupByKey("editAvatar")}
          >
            <img
              className="profile__avatar-edit-icon"
              src={profileEditIcon}
              alt="Editar foto"
            />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__text-name">{safeUser.name}</h1>
            <button
              className="profile__edit-open"
              type="button"
              onClick={() => openPopupByKey("editProfile")}
            >
              <img
                className="profile__edit-vector"
                src={profileEditIcon}
                alt="Editar perfil"
              />
            </button>
          </div>
          <p className="profile__text-about">{safeUser.about}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => openPopupByKey("newCard")}
        >
          <img
            className="profile__add-icon"
            src={addButtonIcon}
            alt="Adicionar card"
          />
        </button>
      </section>

      {/* Cards */}
      <section className="card">
        {cards.length === 0 && <p>Nenhum card ainda</p>}
        {cards.map((cardItem) => (
          <Card
            key={cardItem._id}
            card={cardItem}
            currentUser={safeUser}
            onCardClick={() => openImagePopup(cardItem)}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>

      {/* Popups */}
      {selectedPopup?.key === "editProfile" && (
        <Popup title="Editar Perfil" onClose={closePopup} isOpen>
          <EditProfile onClose={closePopup} />
        </Popup>
      )}

      {selectedPopup?.key === "editAvatar" && (
        <Popup title="Editar Avatar" onClose={closePopup} isOpen>
          <EditAvatar onClose={closePopup} />
        </Popup>
      )}

      {selectedPopup?.key === "newCard" && (
        <Popup title="Novo Card" onClose={closePopup} isOpen>
          <NewCard onClose={closePopup} onAddPlace={handleAddPlace} />
        </Popup>
      )}

      {selectedPopup?.type === "image" && (
        <ImagePopup card={selectedPopup.card} onClose={closePopup} />
      )}

      {cardToRemove && (
        <RemoveCard
          isOpen={!!cardToRemove}
          onClose={closePopup}
          onConfirmDelete={handleConfirmRemoveCard}
          isRemoving={isRemoving}
        />
      )}
    </main>
  );
}
