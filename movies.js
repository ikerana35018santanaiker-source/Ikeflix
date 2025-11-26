const movies = [
    {
        title: "La Fiesta de Halloween que casi nos arruinó la vida...",
        file: "la_fiesta_de_halloween_que_casi_nos_arruino_la_vida"
    },
    {
        title: "Interstellar",
        file: "interstellar"
    },
    {
        title: "Sonic 2: La Película",
        file: "sonic_2_la_pelicula"
    }
];

// Función para cargar películas
function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

    if (!movies || movies.length === 0) {
        grid.innerHTML = "<p>No hay películas definidas. Edita movies.js y añade nombres.</p>";
        return;
    }

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

// Función para reproducir película
function playMovie(file) {
    window.open(`${file}.mp4`, "_blank");
}

// Auto-ejecución al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    const logged = localStorage.getItem("loggedUser");
    if (logged) loadMovies();
});
