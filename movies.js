// ================================================
// LISTA DE TÍTULOS DE PELÍCULAS (SOLO NOMBRES)
// ================================================
const movies = [
    "La Fiesta de Halloween que casi nos arruinó la vida..."
];


// ================================================
// FUNCIÓN PARA GENERAR NOMBRES DE ARCHIVO SEGUROS
// ================================================
function slugify(text) {
    return text
        .normalize("NFD")                     // separa tildes
        .replace(/[\u0300-\u036f]/g, "")      // elimina tildes
        .replace(/[^a-zA-Z0-9 ]/g, "")        // elimina símbolos
        .trim()
        .replace(/\s+/g, "_")                 // espacios → _
        .toLowerCase();                       // minúsculas
}


// ================================================
// CARGA DE LA HOME
// ================================================
function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

    grid.innerHTML = "";

    movies.forEach(title => {
        const file = slugify(title);        // convierte el título en archivo
        const banner = `${file}.png`;

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${banner}"
                 alt="${title}"
                 class="movie-banner"
                 onerror="this.src='fallback.png'">

            <div class="movie-info">
                <h3>${title}</h3>

                <button class="play-btn" onclick="playMovie('${file}')">
                    ▶ Reproducir
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}


// ================================================
// REPRODUCIR PELÍCULA
// ================================================
function playMovie(file) {
    const url = `${file}.mp4`;
    window.open(url, "_blank");
}


// ================================================
// AUTO-EJECUCIÓN
// ================================================
window.addEventListener("DOMContentLoaded", () => {
    const logged = localStorage.getItem("loggedUser");
    if (logged) loadMovies();
});
