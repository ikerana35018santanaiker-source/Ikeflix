document.addEventListener("DOMContentLoaded", () => {
    const moviesList = document.getElementById("movies-list");
    const player = document.getElementById("player-container");
    const playerVideo = document.getElementById("player-video");
    const playerTitle = document.getElementById("player-title");
    const closePlayer = document.getElementById("close-player");

    if (!Array.isArray(movies) || movies.length === 0) {
        moviesList.innerHTML = "<p>No hay películas definidas. Edita movies.js y añade nombres.</p>";
        return;
    }

    movies.forEach(movie => {
        const box = document.createElement("div");
        box.className = "movie-box";

        const img = document.createElement("img");
        img.src = movie.banner;
        img.alt = movie.title;
        box.appendChild(img);

        box.onclick = () => {
            playerTitle.textContent = movie.title;
            playerVideo.src = movie.file;
            player.classList.remove("hidden");
        };

        moviesList.appendChild(box);
    });

    closePlayer.onclick = () => {
        playerVideo.pause();
        playerVideo.src = "";
        player.classList.add("hidden");
    };
});
