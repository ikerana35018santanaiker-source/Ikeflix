// Lista de carpetas dentro de /Peliculas
const movies = [
  "FiveNightsAtFreddys",
  "Sonic2",
  "Interstellar"
];

// AUTO-CARGA
function loadMovies() {
  const container = document.getElementById("movies-list");

  container.innerHTML = "";

  movies.forEach(name => {
    const banner = `Peliculas/${name}/Banner.png`;

    const item = document.createElement("div");
    item.className = "movie-item";
    item.style.backgroundImage = `url(${banner})`;
    item.onclick = () => openMovie(name);

    container.appendChild(item);
  });

  // Big Banner elige la primera película
  if (movies.length > 0) {
    document.getElementById("big-banner").style.backgroundImage =
      `url(Peliculas/${movies[0]}/Banner.png)`;
  }
}
