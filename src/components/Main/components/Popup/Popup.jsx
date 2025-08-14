import React from "react";
import closeIcon from "../../../../assets/close-icon.png"; // ajuste conforme seu caminho real
import "../../../../blocks/popup.css";

export default function Popup({ title, onClose, children, type, isOpen }) {
  return (
    <div className={`popup popup_type_${type} ${isOpen ? "popup_opened" : ""}`}>
      <div
        className="popup__overlay"
        onClick={onClose}
        aria-label="Fechar popup ao clicar fora"
      />
      <div className="popup__container">
        <button
          type="button"
          aria-label="Fechar popup"
          className="popup__close"
          onClick={onClose}
        >
          <img
            src={closeIcon}
            alt="Fechar popup"
            className="popup__close-icon"
          />
        </button>
        <h3 className="popup__profile-edit">{title}</h3>
        {children}
      </div>
    </div>
  );
}
