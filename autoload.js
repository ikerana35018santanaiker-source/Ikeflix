/* AUTO LOAD DE PELÍCULAS DESDE LA CARPETA /movies */

async function loadAllMovies() {
    const sections = {
        inicio: [],
        peliculas: [],
        series: []
    };

    try {
        // Listar carpetas dentro de /movies
        const response = await fetch("movies/");
        const text = await response.text();

        // Buscar nombres de carpetas
        const folderRegex = /href="([^"]+)\/"/g;
        let match;

        const folders = [];
        while ((match = folderRegex.exec(text)) !== null) {
            folders.push(match[1]);
        }

        // Cargar cada película automáticamente
        for (let folder of folders) {
            const info = await fetch(`movies/${folder}/info.json`).then(r => r.json());

            sections[info.category].push({
                title: info.title,
                cover: `movies/${folder}/Banner.png`,
                video: `movies/${folder}/Movie.mp4`,
                description: info.description || ""
            });
        }

        // Renderizar la sección por defecto
        renderSection("inicio", sections);

        window.sectionsData = sections;

    } catch (e) {
        console.error("Error cargando películas automáticamente:", e);
    }
}

/* Renderizar la sección */

function renderSection(section, data) {
    const list = data[section];
    if (!list) return;

    const grid = document.getElementById("grid");
    const banner = document.getElementById("bigbanner");
    const bannerTitle = document.getElementById("bigbanner_title");

    grid.innerHTML = "";

    // Cambiar banner
    banner.style.backgroundImage = `url('${list[0].cover}')`;
    bannerTitle.textContent = list[0].title;

    // Crear tarjetas
    list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card-movie";
        card.innerHTML = `
            <img src="${movie.cover}">
            <div style="padding:10px;font-weight:600">${movie.title}</div>
        `;
        card.onclick = () => openMovie(movie);
        grid.appendChild(card);
    });
}

/* Abrir modal */

function openMovie(movie) {
    const modal = document.getElementById("movie_modal");
    const video = document.getElementById("video_player");
    const banner = document.getElementById("modal_banner");

    banner.style.backgroundImage = `url('${movie.cover}')`;
    video.src = movie.video;
    modal.classList.add("open");

    setTimeout(() => video.classList.remove("hidden"), 300);
}

window.onload = loadAllMovies;
