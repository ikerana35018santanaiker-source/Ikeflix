// SOLO PONES filename + título bonito
// filename = nombre EXACTO del archivo sin extensión (.mp4 y .png)

const movies = [
    { file: "la_fiesta_de_halloween_que_casi_nos_arruino_la_vida", title: "La Fiesta de Halloween que casi nos arruinó la vida..." }
];

// -------------------------------
// Carga de películas en la Home
// -------------------------------
function loadMovies() {
    const grid = document.getElementById("movieGrid");
    grid.innerHTML = "";

    movies.forEach(m => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img class="movie-banner" src="${m.file}.png" alt="${m.title}">
            <div class="movie-info">
                <h3>${m.title}</h3>
                <button class="play-btn" onclick="playMovie('${m.file}')">▶ Reproducir</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// -------------------------------
// Reproducir película
// -------------------------------
function playMovie(file) {
    window.location.href = file + ".mp4";
}
