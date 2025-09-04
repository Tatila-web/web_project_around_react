import React, { useEffect } from "react";
import "@blocks/popup-image.css";

export default function ImagePopup({ card, onClose }) {
  // Fecha o popup ao pressionar ESC
  useEffect(() => {
    if (!card) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [card, onClose]);

  // Não renderiza nada se não houver card
  if (!card) return null;

  return (
    <div className="popup-image" onClick={onClose}>
      <div
        className="popup-image__content"
        onClick={(e) => e.stopPropagation()} // evita fechamento ao clicar no conteúdo
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
