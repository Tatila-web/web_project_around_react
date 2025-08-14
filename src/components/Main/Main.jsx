import React, { useState, useEffect } from "react";
import Popup from "./components/Popup/Popup";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";

import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";

import avatar from "../../images/image_Jacques.jpg";
import profileEditIcon from "../../images/vetores/Vector_profile-info.png";
import addButtonIcon from "../../images/vetores/Vector_addButton.png";

import Card from "./components/Card/Card";
import "../../blocks/card.css";
import "../../blocks/popup.css";

function Main() {
  const [popup, setPopup] = useState(null);

  const cards = [
    {
      _id: "1",
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
      _id: "2",
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
      _id: "3",
      name: "Golfinho",
      link: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=600&auto=format&fit=crop&q=60",
    },
    {
      _id: "4",
      name: "Cavalos na Praia",
      link: "https://images.unsplash.com/photo-1498825808825-51e29f189358?w=600&auto=format&fit=crop&q=60",
    },
    {
      _id: "5",
      name: "Coala",
      link: "https://images.unsplash.com/photo-1547269646-2e1478ba0333?w=600&auto=format&fit=crop&q=60",
    },
    {
      _id: "6",
      name: "Gatinho",
      link: "https://images.unsplash.com/photo-1602634881768-3831844d49aa?w=600&auto=format&fit=crop&q=60",
    },
  ];

  const popups = {
    newCard: {
      title: "New card",
      children: <NewCard />,
      type: "profile",
    },
    editProfile: {
      title: "Edit profile",
      children: <EditProfile />,
      type: "profile",
    },
    editAvatar: {
      title: "Edit avatar",
      children: <EditAvatar />,
      type: "avatar",
    },
  };

  function openPopup(popupKey) {
    setPopup(popups[popupKey]);
  }

  function openImagePopup(card) {
    setPopup({ type: "image", card });
  }

  function closePopup() {
    setPopup(null);
  }

  // Fechar popup com ESC
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") closePopup();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <main className="content">
      {/* Perfil */}
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={avatar}
            alt="Foto de perfil de Jacques Cousteau"
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            aria-label="Editar foto do perfil"
            onClick={() => openPopup("editAvatar")}
          >
            <img
              className="profile__avatar-edit-icon"
              src={profileEditIcon}
              alt="Ícone editar foto do perfil"
            />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__text-name">Jacques Cousteau</h1>
            <button
              className="profile__edit-open"
              type="button"
              onClick={() => openPopup("editProfile")}
            >
              <img
                className="profile__edit-vector"
                src={profileEditIcon}
                alt="Botão editar perfil"
              />
            </button>
          </div>
          <p className="profile__text-about">Explorador</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          aria-label="Adicionar cartão"
          onClick={() => openPopup("newCard")}
        >
          <img
            className="profile__add-icon"
            src={addButtonIcon}
            alt="Botão adicionar"
          />
        </button>
      </section>

      {/* Lista de cards */}
      <section className="card">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={() => openImagePopup(card)}
          />
        ))}
      </section>

      {/* Popups de formulário */}
      {popup?.type === "profile" || popup?.type === "avatar" ? (
        <Popup
          onClose={closePopup}
          title={popup.title}
          type={popup.type}
          isOpen={true}
        >
          {popup.children}
        </Popup>
      ) : null}

      {/* Popup de imagem */}
      {popup?.type === "image" && (
        <ImagePopup card={popup.card} onClose={closePopup} />
      )}
    </main>
  );
}

export default Main;
