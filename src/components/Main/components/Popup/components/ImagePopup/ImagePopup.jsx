import React from "react";

export default function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
    <div className="popup-image" onClick={onClose}>
      <div
        className="popup-image__content"
        onClick={(e) => e.stopPropagation()} // evita fechar clicando na imagem
      >
        <button
          aria-label="Fechar popup de imagem"
          className="popup-image__close"
          type="button"
          onClick={onClose}
        >
          &times;
        </button>

        <img src={card.link} alt={card.name} className="popup-image__img" />
        <p className="popup-image__title">{card.name}</p>
      </div>
    </div>
  );
}
