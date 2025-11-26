// Lista de películas (friendlyName y fileName)
const movies = [
    {
        title: "La Fiesta de Halloween que casi nos arruinó la vida...",
        file: "fiesta_halloween"
    }
];


// ==============================
// CARGA DE LA HOME
// ==============================

function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

    grid.innerHTML = ""; 

    movies.forEach(movie => {
        const banner = movie.file + ".png";

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${banner}" 
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


// ==============================
// REPRODUCIR PELÍCULA
// ==============================

function playMovie(fileName) {
    const url = `${fileName}.mp4`;
    window.open(url, "_blank");
}


// ==============================
// AUTO-EJECUCIÓN
// ==============================

window.addEventListener("DOMContentLoaded", () => {
    const logged = localStorage.getItem("loggedUser");
    if (logged) loadMovies();
});
