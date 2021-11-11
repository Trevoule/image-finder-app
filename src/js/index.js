import markUpImagesCardTpl from '../templates/markUpImagesCard.hbs';
import ImageApiService from './api-service.js';
import LoadMoreBtn from './load-more-btn'
import onModalImage from './modal.js'

const imageApiService = new ImageApiService();

const refs = { 
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  element: document.querySelector('.button'),
}

const loadMoreBtn = new LoadMoreBtn({ 
  selector: '[data-action ="load-more"]',
  hidden: true,
})


refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);


function onSearch(e) {

  e.preventDefault();
  imageApiService.query = e.currentTarget.elements.query.value;
  
  if (imageApiService.query === '') {
  return alert('Invalid input')
  }

  imageApiService.resetPage(); 
  clearImagesContainer();
  fetchImages()
}

function fetchImages() {
  
  refs.element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
  });

  loadMoreBtn.disable()
  imageApiService.fetchImages()
    .then(image => {
      if (image.hits.length === 12) {
        loadMoreBtn.show()
        renderImageCard(image);
        loadMoreBtn.enable()

        if(imageApiService.page > 2){
          refs.element.scrollIntoView(false);
        }
        return
      }

      renderImageCard(image);
      loadMoreBtn.hide();
    })
    .catch(error => console.log(error));
}

function renderImageCard(image) {
  refs.gallery.insertAdjacentHTML('beforeend',markUpImagesCardTpl(image))
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

refs.gallery.addEventListener('click', onModalImage)


