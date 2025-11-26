// Función para convertir nombre de archivo a título bonito
function titleFromFile(file) {
    let name = file.replace(/\.(png|mp4)$/i, ""); // quita extensión
    name = name.replace(/_/g, " ");               // convierte _ en espacio
    name = name.replace(/\b\w/g, l => l.toUpperCase()); // capitalize
    return name;
}

// Array de películas
const movies = [];

// Detectar automáticamente archivos (solo con servidor local)
fetch(".") // la carpeta actual
  .then(res => res.text())
  .then(html => {
    // Busca todos los archivos .png
    const files = [...html.matchAll(/href="([^"]+\.png)"/g)].map(m => m[1]);
    files.forEach(file => {
        const baseName = file.replace(/\.png$/i, "");
        const title = titleFromFile(baseName);
        movies.push({ title, file: baseName });
    });
    loadMovies(); // carga después de detectar
  })
  .catch(err => console.log("No se pudo leer la carpeta. Debes usar un servidor local.", err));

// Función de carga
function loadMovies() {
    const grid = document.getElementById("movieGrid");
    if (!grid) return;

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

// Reproducir película
function playMovie(file) {
    window.open(`${file}.mp4`, "_blank");
}
