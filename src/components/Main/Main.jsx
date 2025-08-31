import React, { useContext } from "react";
import Card from "@componentsMain/Card/Card.jsx";
import { CurrentUserContext } from "@contexts/CurrentUserContext.js";

import profileEditIcon from "@images/vetores/Vector_profile-info.png";
import addButtonIcon from "@images/vetores/Vector_addButton.png";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  openPopupByKey,
  openImagePopup,
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
            src={safeUser.avatar || ""}
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
            onCardLike={() => onCardLike(cardItem)}
            onCardDelete={() => onCardDelete(cardItem)}
          />
        ))}
      </section>
    </main>
  );
}
