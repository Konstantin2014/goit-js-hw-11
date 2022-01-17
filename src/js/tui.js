import Notiflix from 'notiflix';

import GalleryApiService from './js/api-service';
import galleryCardTpl from './templates/gallery-card.hbs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import './css/common.css';

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};
const container = document.getElementById('tui-pagination-container');

const galleryApiService = new GalleryApiService();

let sumHits = galleryApiService.perPage;
let gallery = new SimpleLightbox('.gallery a');

let pagination = new Pagination(container, {
  totalItems: 0,
  itemsPerPage: galleryApiService.perPage,
  page: 1,
});

console.dir(pagination);
const page = pagination.getCurrentPage();
refs.form.addEventListener('submit', onSearch);
// container.addEventListener('click', onPagination);
// refs.loadMore.addEventListener('click', onLoadMore);
refs.loadMore.classList.add('is-hidden');

galleryApiService.getPopularImages(page).then(images => {
  renderGallery(images.hits);
  pagination.reset(images.totalHits);
});

function onSearch(e) {
  e.preventDefault();

  // if (!refs.loadMore.classList.contains('is-hidden')) {
  //   refs.loadMore.classList.add('is-hidden');
  // }
  pagination.off('afterMove', eventPagination);
  galleryApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  pagination.movePageTo(page);
  galleryApiService.getSearchImages(page).then(images => {
    if (images.hits.length === 0 || galleryApiService.searchQuery.trim() === '') {
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }

    resetRenderGallery();
    renderGallery(images.hits);
    // scrollWindow(images.hits.length / 4);
    gallery.refresh();

    pagination.on('afterMove', eventSearchPagination);
    // refs.loadMore.classList.remove('is-hidden');
    Notiflix.Notify.info(`Hooray! We found ${images.totalHits} images.`);
  });
}

pagination.on('afterMove', eventPagination);

function eventPagination(event) {
  console.log(event.page);
  // galleryApiService.setNewPage = event.page;
  galleryApiService.getPopularImages(event.page).then(images => {
    resetRenderGallery();
    renderGallery(images.hits);
  });
}

function eventSearchPagination(event) {
  console.log(page);
  // galleryApiService.setNewPage = event.page;
  galleryApiService.getSearchImages(event.page).then(images => {
    resetRenderGallery();
    renderGallery(images.hits);
  });
}

// function onLoadMore() {
//   galleryApiService.getImages().then(images => {
//     sumHits += images.hits.length;
//     if (images.totalHits === sumHits) {
//       refs.loadMore.classList.add('is-hidden');
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//     renderGallery(images.hits);
//     scrollWindow(images.hits.length / 4);
//     gallery.refresh();
//   });
// }

function renderGallery(images) {
  refs.container.insertAdjacentHTML('beforeend', galleryCardTpl(images));
}

function resetRenderGallery() {
  refs.container.innerHTML = '';
}

// function scrollWindow(count) {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * count + cardHeight,
//     behavior: 'smooth',
//   });
// }
