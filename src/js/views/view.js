import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clearElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clearElement() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const spinnerContent = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clearElement();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerContent);
  }

  renderError(errorMessage = this._errorMessage) {
    const errorMarkup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>`;
    this._clearElement();
    this._parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  renderMessage(message = this._successMessage) {
    const messageMarkup = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p> ${message} </p>
      </div>`;
    this._clearElement();
    this._parentElement.insertAdjacentHTML('afterbegin', messageMarkup);
  }
}
