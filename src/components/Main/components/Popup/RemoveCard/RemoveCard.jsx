import React from "react";
import Popup from "@componentsMain/Popup/Popup.jsx";

export default function RemoveCard({
  isOpen,
  onClose,
  onConfirmDelete,
  isRemoving,
}) {
  return (
    <Popup
      title="Excluir este card?"
      type="remove-card"
      isOpen={isOpen}
      onClose={onClose}
    >
      <button
        className="popup__confirm-submit-button"
        onClick={onConfirmDelete}
        disabled={isRemoving}
      >
        {isRemoving ? "Excluindo..." : "Sim, excluir"}
      </button>
    </Popup>
  );
}
