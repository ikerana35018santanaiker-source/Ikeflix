// Lista de títulos bonitos
const movies = [
    "La Fiesta de Halloween que casi nos arruinó la vida...",
    "Sonic 2: La Película",
    "Interstellar",
    "Shrek Para Siempre"
];

// Función que convierte título en un nombre de archivo seguro
function slugify(text) {
    return text
        .normalize("NFD")                 // separa acentos
        .replace(/[\u0300-\u036f]/g, "")  // quita acentos
        .replace(/[^a-zA-Z0-9 ]/g, "")    // quita símbolos raros
        .trim()
        .replace(/\s+/g, "_")             // espacios -> _
        .toLowerCase();                   // minúsculas
}

// Cargar películas
function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

    grid.innerHTML = "";

    movies.forEach(title => {
        const file = slugify(title);
        const banner = `${file}.png`;

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${banner}" alt="${title}" class="movie-banner" onerror="this.src='fallback.png'">
            <div class="movie-info">
                <h3>${title}</h3>
                <button class="play-btn" onclick="playMovie('${file}')">▶ Reproducir</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Reproducir película
function playMovie(file) {
    window.open(`${file}.mp4`, "_blank");
}

// Auto-ejecución al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    const logged = localStorage.getItem("loggedUser");
    if (logged) loadMovies();
});
