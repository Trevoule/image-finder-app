const BASE_URL = 'https://pixabay.com/api/'
const key = '21919770-ab47afa30cafb8471cb1374de';

export default class ImageApiService{
    constructor() {
        this.searchQuery = ''; 
        this.page = 0; 
        this.id ='' 
    }
    fetchImages() {
        return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${key}`)
            .then((res => {
                   this.incrementPage();
                   return res.json()
            }))
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    
}