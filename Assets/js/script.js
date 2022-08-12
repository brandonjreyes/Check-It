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

// Global Tag State
let current_tag = 'All';

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
    for (let i = 0; i < data.results.length; i++) {
        let movie = data.results[i];
        let title = movie.original_title;
        let result = $('<li></li>');
        createResultImage(img_URL + movie.poster_path, movie.id, result);
        result.appendTo(resultsList);
    }
}

// returns movie details
function imgFromID(data) {
    let result1id = data.results[0].id;
    fetch(tmdb_detail_URL + result1id + tmdb_key)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return (img_URL + data.poster_path);
        })
}

// puts an image on the page ( needs URL of img, alt tag for it, and where you want to append it to)
function createResultImage(imgURL, alt, location) {
    let img = $('<img></img>');
    img.attr('src', imgURL);
    img.attr("alt", alt);
    img.addClass("movie-add-btn");
    img.attr("onclick", "storeMovie(this.src);");
    img.appendTo(location);
}

function createImage(imgURL, alt, location) {
    let img = $('<img></img>');
    img.attr('src', imgURL);
    img.attr("alt", alt);
    img.appendTo(location);
}

// PLACEHOLDER FUNCTIONALITY -- FOR DEMO

const tagInput = $("#tag-input");
const tagBtn = $('#newTagBtn');
const movieAddBtn = $(".movie-add-btn");
const tagText = $(".tag-text");
const tagDisplay = $("#tag-display");

tagBtn.click(function(event) {
    addTag(tagInput.val());
});

movieAddBtn.click(function(event) {
    storeMovie();
    updateCheckIts();
});

$("#sidebar-tags").on('click','li', function () {
    let selectedTag = ($(this).html());
    changeTag(selectedTag);
});

function addTag(tagName) {
    let tagNameEl = $('<li></li>')
    tagNameEl.text(tagName);
    tagNameEl.addClass('tag-text');
    tagNameEl.appendTo($('#sidebar-tags'));
}

function storeMovie(src) {
    console.log(src);
    localStorage.setItem(current_tag, JSON.stringify('src'));
}

function changeTag(tag) {
    current_tag = tag;
    tagDisplay.text(tag);
}

updateCheckIts();

function generateCheckIts (tag) {
    let checkitListEl = $('<li></li>');
    createImage(placeholderImgURL, 'placeholders', checkitListEl);
    checkitListEl.appendTo(checkIts);

}