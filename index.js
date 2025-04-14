
const API_KEY = "8bea6fd3e9fcdacf021d0e146f857504";
const BASE_URL = "https://api.themoviedb.org/3";

async function searchMovies() {
    const query = document.getElementById("searchBox").value;
    if (query.length < 3) return;

    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p>⭐ ${movie.vote_average}</p>
                <p>${movie.release_date}</p>
            </div>
        `;
        movieElement.onclick = () => showMovieDetails(movie.id);
        movieList.appendChild(movieElement);
    });
}

async function showMovieDetails(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
    const movie = await response.json();
    
    alert(`Title: ${movie.title}\nRating: ${movie.vote_average}\nOverview: ${movie.overview}`);
}
