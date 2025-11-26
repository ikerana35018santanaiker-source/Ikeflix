const movies = [
    "Interstellar",
    "Sonic2",
    "Shrek",
    "FiveNightsAtFreddys"
];

function loadMovies() {
    const home = document.getElementById("home-screen");
    home.innerHTML = "";

    // Banner principal -> usa la primera película
    home.innerHTML += `
        <div class="big-banner slide-up" style="background-image:url('${movies[0]}.png')"></div>
        <h2 class="section-title">Películas</h2>
        <div class="movies-row" id="movies-row"></div>
    `;

    const row = document.getElementById("movies-row");

    movies.forEach(m => {
        row.innerHTML += `
            <div class="movie-item slide-up">
                <img src="${m}.png" onclick="openMovie('${m}')">
            </div>
        `;
    });
}

function openMovie(name){
    // Abre directamente el archivo mp4
    window.open(name + ".mp4", "_blank");
}
