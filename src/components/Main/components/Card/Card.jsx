import React from "react";
import deleteIcon from "../../../../images/vetores/Vector_delete.png";
import likeIcon from "../../../../images/vetores/Vector_like.png";
import likeIconActive from "../../../../images/vetores/Vector_like_black.png";
import "../../../../blocks/card.css";

export default function Card({ card, onCardClick }) {
  const { name, link, isLiked } = card;

  return (
    <article className="card__elements">
      {/* Imagem do card - abre popup ao clicar */}
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick && onCardClick(card)}
      />

      {/* Botão de deletar */}
      <button
        aria-label="Delete card"
        className="card__btn-delete"
        type="button"
      >
        <img src={deleteIcon} alt="Excluir" className="card__delete-icon" />
      </button>

      {/* Descrição e botão de curtir */}
      <div className="card__description">
        <h2 className="card__text-description">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={`card__btn-like ${isLiked ? "card__btn-like_active" : ""}`}
        >
          <img
            src={isLiked ? likeIconActive : likeIcon}
            alt={isLiked ? "Curtido" : "Curtir"}
            className="card__like"
          />
        </button>
      </div>
    </article>
  );
}
