import View from './view';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found! Please try with a different search.';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(result => previewView.createMarkup(result)).join('');
  }
}

export default new ResultsView();
