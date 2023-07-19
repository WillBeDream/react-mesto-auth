class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkError(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkError);
  }

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkError);
  }

  setInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.description
      }),
    })
    .then(this._checkError);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkError);
  }

  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkError)
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    })
    .then(this._checkError)
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkError)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkError)
  }

}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "e6a0e803-edb8-48ba-914a-f56a2f7674a9",
    "Content-Type": "application/json",
  },
});

export default api;