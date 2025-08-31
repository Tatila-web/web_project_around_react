import React, { useEffect } from "react";
import closeIcon from "../../../../assets/close-icon.png";
import "../../../../blocks/popup.css";

export default function Popup({ title, children, type, isOpen, onClose }) {
  const isCenteredTitle = type === "avatar" || type === "remove-card";

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`popup popup_type_${type} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
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

        {title && (
          <h3
            className="popup__profile-edit"
            style={{ textAlign: isCenteredTitle ? "center" : "left" }}
          >
            {title}
          </h3>
        )}

        {children}
      </div>
    </div>
  );
}
