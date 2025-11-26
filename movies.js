const movies = [
    "La Fiesta de Halloween que casi nos arruinó la vida..."
];

// --------------------
// Convierte título en nombre de archivo seguro
// --------------------
function slugify(text) {
    return text
        .normalize("NFD")                    // separa acentos
        .replace(/[\u0300-\u036f]/g, "")     // quita tildes
        .replace(/[^a-zA-Z0-9 ]/g, "")       // quita símbolos raros
        .trim()
        .replace(/\s+/g, "_")                // espacios → _
        .toLowerCase();
}

// --------------------
// Genera array final con títulos y archivos
// --------------------
const moviesData = movies.map(title => ({
    title: title,
    file: slugify(title)
}));

// --------------------
// Cargar películas en la UI
// --------------------
function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

    if (!moviesData || moviesData.length === 0) {
        grid.innerHTML = "<p>No hay películas definidas. Edita movies.js y añade nombres.</p>";
        return;
    }

    grid.innerHTML = "";

    moviesData.forEach(movie => {
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
// Reproducir película
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
