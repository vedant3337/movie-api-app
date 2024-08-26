const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

const getMovieInfo = async (movie) => {
  try {
    const api_key = "dde37068";
    const url = `http://www.omdbapi.com/?apikey=${api_key}&t=${movie}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new error("Unable to find Movie!");
    }
    const data = await response.json();
    showMovieData(data);
  } catch (error) {
    showError("Movie Not Found!");
  }
};

const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBgc");
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: </strong>${imdbRating}</p>`;
  const movieGenre = document.createElement("div");
  movieGenre.classList.add("movie-genre");
  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    movieGenre.appendChild(p);
  });

  movieElement.appendChild(movieGenre);

  movieElement.innerHTML += `<p><strong>Release Date </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;
  const moviePoster = document.createElement("div");
  moviePoster.classList.add("movie-poster");
  moviePoster.innerHTML = `<img src='${Poster}'/>`;
  movieContainer.appendChild(moviePoster);
  movieContainer.appendChild(movieElement);
};

const showError = (msg) => {
  movieContainer.innerHTML = `<h2>${msg}</h2>`;
  movieContainer.classList.add("noBgc");
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showError("Fetching Information...");
    getMovieInfo(movieName);
  } else {
    showError("Please Enter Movie Name!");
  }
});
