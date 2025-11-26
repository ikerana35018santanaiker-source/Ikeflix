const movies = [
    { title: "La Fiesta de Halloween que casi nos arruinó la vida...", file: "la_fiesta_de_halloween_que_casi_nos_arruino_la_vida" },
    { title: "Interstellar", file: "interstellar" },
    { title: "Sonic 2: La Película", file: "sonic_2_la_pelicula" }
];

function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;
    grid.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <img src="${movie.file}.png" alt="${movie.title}" class="movie-banner">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <button class="play-btn" onclick="playMovie('${movie.file}')">▶ Reproducir</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function playMovie(file) {
    window.location.href = `${file}.mp4`; // mejor que open para Netlify
}

window.addEventListener("DOMContentLoaded", () => {
    loadMovies();
});
