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
const resultsList = $('#results-list');

// check it variables 
const checkIts = $('#check-its-list');

// search button / enter functionality
searchInput.keypress(function(event) {
    if (event.key === "Enter") {
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
    console.log('data', data)
    for (let i = 0; i < data.length; i++) {
        let movie = data [i];
        let result = $('<li></li>');
        setImage( movie.image_url, movie.title, result);
        result.appendTo(checkIts);
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

function retrieveCheckIts () {
    // PLACEHOLDER POSTERS
    let checkitListEl = $('<li></li>');
    createImage(placeholderImgURL, 'placeholders', checkitListEl);
    checkitListEl.appendTo(checkIts);

}

// puts an image on the page ( needs URL of img, alt tag for it, and where you want to append it to)
function createImage(imgURL, alt, location) {
    let img = $('<img></img>');
    img.attr('src', imgURL);
    img.attr("alt", alt);
    img.appendTo(location);
}

for (let i = 0; i < 38; i++) {
    retrieveCheckIts();
}
//create img
async function setImage(imgURL, alt, location) {
    
    var response = await fetch(imgURL)
    const reader = response.body.getReader();
    var stream = await new ReadableStream({
        start(controller) { 
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        }
      })
  
    var res = new Response(stream)
    var blob = await res.blob()
    //$("#Rage-quit").attr("src", URL.createObjectURL(blob));
    let img = $('<img></img>');
    img.attr('src', URL.createObjectURL(blob));
    img.attr("alt", alt);
    img.appendTo(location);
  }
  

//btn movies/music/tv shows

var btnMovies= document.getElementById('btn-movies')
var btnMusic= document.getElementById('btn-music')
var btnTvShows= document.getElementById('btn-tv-shows')

btnMovies.addEventListener('click', searchMovies)
function searchMovies(){
     var searchUrl = 'http://localhost:3000/watch-list-contents?tag=1&user=dgiraldo'
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
        generateSearchResults(data);
    })
}