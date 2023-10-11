class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const searchQuery =
      this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return searchQuery;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
