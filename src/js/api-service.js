import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25251210-ac1999c1ffdbc1fb6fbdee37e';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    // this.page = '1';
    this.perPage = 8;
  }

  async getPopularImages(page) {
    try {
      const response = await axios.get(
        `${BASE_URL}/?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${this.perPage}`,
      );
      const images = await response.data;
      // this.incrementPage();

      return images;
    } catch (error) {
      console.log(error);
    }
  }

  async getSearchImages(page) {
    try {
      const response = await axios.get(
        `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${this.perPage}`,
      );
      const images = await response.data;
      // this.incrementPage();

      return images;
    } catch (error) {
      console.log(error);
    }
  }

  // incrementPage() {
  //   this.page += 1;
  // }

  // resetPage() {
  //   this._page = 1;
  // }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  // set setNewPage(newPage) {
  //   this.page = newPage;
  // }
}
