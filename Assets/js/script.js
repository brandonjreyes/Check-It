// placeholders
const placeholderImgURL = 'https://via.placeholder.com/200'

// Movie Database Variables
const tmdb_detail_URL = 'https://api.themoviedb.org/3/movie/';
const tmdb_search_URL = 'https://api.themoviedb.org/3/search/movie';
const tmdb_key = '?api_key=8afe6659c203f96744facc3ae6d50faa';
const pages_URL = '&page=1';
const query_URL = '&query=';
const SFW_URL = '&include_adult=false';
const img_URL = 'https://image.tmdb.org/t/p/w185/';

// search variables
const searchInput = $('#search-input');
const searchResults = $('#search-results');

// search button / enter functionality
searchInput.keypress(function(event) {
    if (event.key === "Enter") {
        console.log(searchInput.val());
        searchMovie(searchInput.val());
    }
});

// searches for movies using keyword(s). 
function searchMovie(search) {
    let searchURL = (tmdb_search_URL + tmdb_key + query_URL + search + pages_URL + SFW_URL);
    fetch(searchURL)
        .then(response => response.json())
        .then(data => {
            generateSearchResults(data);
        })
}

// creates movie posters in search result area
function generateSearchResults(data) {
    for (let i = 0; i < 5; i++) {
        let movie = data.results[i];
        let title = movie.original_title;
        createImage(img_URL + movie.poster_path, movie.original_title, searchResults);
    }
}

// returns movie details
function movieDetails(data) {
    let result1id = data.results[0].id;
    fetch(tmdb_detail_URL + result1id + tmdb_key)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return (img_URL + data.poster_path);
        })
}

// puts an image on the page ( needs URL of img, alt tag for it, and where you want to append it to)
function createImage(imgURL, alt, location) {
    let img = $('<img></img>');
    img.attr('src', imgURL);
    img.attr("alt", alt);
    img.appendTo(location);
}
