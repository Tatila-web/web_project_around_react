import React from "react";
import "@blocks/card.css";
import likeIcon from "@images/vetores/Vector_like.png";
import likeIconActive from "@images/vetores/Vector_like_black.png";
import deleteIcon from "@images/vetores/Vector_delete.png";

export default function Card({
  card,
  currentUser,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.isLiked;

  return (
    <div className="card__elements">
      {isOwn && (
        <button className="card__btn-delete" onClick={onCardDelete}>
          <img
            className="card__delete-icon"
            src={deleteIcon}
            alt="Excluir cartão"
          />
        </button>
      )}

      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />

      <div className="card__description">
        <h2 className="card__text-description">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={`card__btn-like ${
              isLiked ? "card__btn-like_active" : ""
            }`}
            onClick={onCardLike}
          >
            <img
              className="card__like"
              src={isLiked ? likeIconActive : likeIcon}
              alt="Curtir"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
