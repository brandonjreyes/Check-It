// Movie Database Variables

const tmdb_detail_URL = 'https://api.themoviedb.org/3/movie/';
const tmdb_search_URL = 'https://api.themoviedb.org/3/search/movie';
const tmdb_key = '?api_key=8afe6659c203f96744facc3ae6d50faa';
const pages_URL = '&page=1';
const query_URL = '&query=';
const SFW_URL = '&include_adult=false';

// searches for movies using keyword(s).
function searchMovie(search) {
    let searchURL = (tmdb_search_URL + tmdb_key + query_URL + search + pages_URL + SFW_URL);
    fetch(searchURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        movieDetails(data);
    })
}

// gets movie details with ID
function movieDetails(data) {
    let result1id = data.results[0].id;
    fetch(tmdb_detail_URL + result1id + tmdb_key)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log('https://image.tmdb.org/t/p/w185/' + data.poster_path);
    })
}

// puts an image on the page
const testImgDiv = $('#testImgDiv');
function createImage(imgURL, alt) {
    let img = $('<img></img>')
    img.attr('src', imgURL);
    img.attr("alt", alt);
    img.appendTo(testImgDiv);
}

createImage(movieImageURL, 'placeholder 300px');
searchMovie('Toy Story');