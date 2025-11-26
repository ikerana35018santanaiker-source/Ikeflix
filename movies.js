const moviesTitles = [
    "La Fiesta de Halloween que casi nos arruinó la vida...",
    "Interstellar",
    "Sonic 2: La Película",
    "Shrek Para Siempre"
];

// --------------------
// Función para convertir título en nombre de archivo seguro
// --------------------
function slugify(text) {
    return text
        .normalize("NFD")                     // separa tildes
        .replace(/[\u0300-\u036f]/g, "")      // quita acentos
        .replace(/[^a-zA-Z0-9 ]/g, "")        // quita símbolos raros
        .trim()
        .replace(/\s+/g, "_")                 // espacios -> _
        .toLowerCase();
}

// --------------------
// Generar array final de movies
// --------------------
const movies = moviesTitles.map(title => ({
    title: title,
    file: slugify(title)
}));

// --------------------
// Función para cargar películas en la UI
// --------------------
function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

    grid.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.file}.png" alt="${movie.title}" class="movie-banner" onerror="this.src='fallback.png'">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <button class="play-btn" onclick="playMovie('${movie.file}')">▶ Reproducir</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --------------------
// Función para reproducir película
// --------------------
function playMovie(file) {
    window.open(`${file}.mp4`, "_blank");
}

// --------------------
// Auto-ejecución al cargar la página
// --------------------
window.addEventListener("DOMContentLoaded", () => {
    const logged = localStorage.getItem("loggedUser");
    if (logged) loadMovies();
});
