import View from './view';

import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerWindow() {
    this._buttonOpen.addEventListener('click', this._toggleWindow.bind(this));
    this._buttonClose.addEventListener('click', this._toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataArray = [...new FormData(this)];
      const dataObject = Object.fromEntries(dataArray);
      handler(dataObject);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
