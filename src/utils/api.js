import { API_TOKEN, BASE_URL } from "./config.js";

class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Erro: ${res.status}`);
  }

  _makeRequest(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options,
    }).then(this._checkResponse);
  }

  // === Usuário ===
  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  setUserInfo({ name, about }) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateAvatar(avatarUrl) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarUrl }),
    });
  }

  // === Cards ===
  getInitialCards() {
    return this._makeRequest("/cards");
  }

  addCard({ name, link }) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  // === Likes ===
  likeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  // Atalho: decide sozinho se dá like ou unlike
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }
}

export const api = new Api(BASE_URL, API_TOKEN);
