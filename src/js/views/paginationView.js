import View from './view';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--inline');
      if (!button) return;

      const goToPage = Number(button.dataset.gotopage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const pages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (pages > 1) {
      if (currentPage === 1) {
        return this._generateMarkupNextButton(currentPage);
      }
      if (currentPage < pages) {
        return `${this._generateMarkupPreviousButton(
          currentPage
        )}${this._generateMarkupNextButton(currentPage)}`;
      }
      return this._generateMarkupPreviousButton(currentPage);
    }
    return '';
  }

  _generateMarkupPreviousButton(page) {
    return `<button data-gotopage=${
      page - 1
    } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${page - 1}</span>
            </button>`;
  }

  _generateMarkupNextButton(page) {
    return `<button data-gotopage=${
      page + 1
    } class="btn--inline pagination__btn--next">
                <span>Page ${page + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
  }
}

export default new PaginationView();
