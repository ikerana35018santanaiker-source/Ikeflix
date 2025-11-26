const movies = [
    "Interstellar",
    "Sonic2",
    "Shrek",
    "FiveNightsAtFreddys"
];


// ==============================
// CARGA DE LA HOME
// ==============================

function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

    grid.innerHTML = ""; 

    movies.forEach(movieName => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movieName}.png" 
                 alt="${movieName}"
                 class="movie-banner"
                 onerror="this.src='fallback.png'">

            <div class="movie-info">
                <h3>${movieName}</h3>
                <button class="play-btn" onclick="playMovie('${movieName}')">
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

function playMovie(name) {
    const url = `${name}.mp4`;
    window.open(url, "_blank");
}


// ==============================
// AUTO-EJECUCIÓN
// ==============================

window.addEventListener("DOMContentLoaded", () => {
    // Si estamos logueados y en la home, cargar películas
    const logged = localStorage.getItem("loggedUser");
    if (logged) loadMovies();
});
