// Lista manual de archivos (solo sus nombres, sin extensión)
// Aquí agregas tus películas reales (los nombres de los archivos mp4)
// EJEMPLO:
const fileNames = [
  "la_fiesta_de_halloween_que_casi_nos_arruino_la_vida"
];

// Convierte nombre de archivo en título bonito
function titleFromFile(file) {
    let name = file.replace(/_/g, " ");               // _ → espacio
    name = name.replace(/\b\w/g, l => l.toUpperCase()); // Capitalizar cada palabra
    return name;
}

// Genera el array final de movies automáticamente
const movies = fileNames.map(f => ({
    file: f,
    title: titleFromFile(f)
}));

// --------------------
// Cargar películas
// --------------------
function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

    grid.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.file}.png" 
                 alt="${movie.title}" 
                 class="movie-banner" 
                 onerror="this.src='fallback.png'">

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <button class="play-btn" onclick="playMovie('${movie.file}')">
                    ▶ Reproducir
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --------------------
// Reproducir película
// --------------------
function playMovie(file) {
    window.open(`${file}.mp4`, "_blank");
}

// --------------------
// Auto-ejecución
// --------------------
window.addEventListener("DOMContentLoaded", () => {
    const logged = localStorage.getItem("loggedUser");
    if (logged) loadMovies();
});
