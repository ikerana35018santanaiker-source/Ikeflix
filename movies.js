// Lista de carpetas dentro de /Peliculas
// Agrega o quita nombres de carpeta según tu contenido
const movies = [
  "FiveNightsAtFreddys",
  "Sonic2",
  "Interstellar",
  "Shrek"
];

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

  // Big Banner automático
  if (movies.length > 0) {
    document.getElementById("big-banner").style.backgroundImage =
      `url(Peliculas/${movies[0]}/Banner.png)`;
  }
}
