/* --------------------- DATA DE PELÍCULAS / SERIES --------------------- */

const moviesData = {
  inicio: [
    {
      title: "Tralalero Tralala Movie",
      cover: "TralaleroTralalaMovie.png",
      video: "videos/TralaleroTralalaMovie.mp4"
    },
    {
      title: "Cat Legends",
      cover: "covers/catlegends.jpg",
      video: "videos/catlegends.mp4"
    }
  ],

  series: [
    {
      title: "Feline Adventures",
      cover: "covers/felineadventures.jpg",
      video: "videos/felineadventures.mp4"
    },
    {
      title: "Street Cats",
      cover: "covers/streetcats.jpg",
      video: "videos/streetcats.mp4"
    }
  ],

  peliculas: [
    {
      title: "Midnight Meow",
      cover: "covers/midnightmeow.jpg",
      video: "videos/midnightmeow.mp4"
    },
    {
      title: "Laser Pointer War",
      cover: "covers/laserwar.jpg",
      video: "videos/laserwar.mp4"
    },
    {
      title: "The Big Purrr",
      cover: "covers/thebigpurr.jpg",
      video: "videos/thebigpurr.mp4"
    }
  ]
};



/* --------------------- FUNCIÓN PARA CARGAR PELÍCULAS --------------------- */

function loadMovies(section) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const list = moviesData[section];
  if (!list) return;

  // Cambiar banner
  const banner = document.getElementById("bigbanner");
  const bannerTitle = document.getElementById("bigbanner_title");

  banner.style.backgroundImage = `url('${list[0].cover}')`;
  bannerTitle.textContent = list[0].title;

  // Crear tarjetas
  list.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card-movie";
    card.innerHTML = `
      <img src="${item.cover}">
      <div style="padding:10px;font-weight:600">${item.title}</div>
    `;
    card.onclick = () => openMovie(item);
    grid.appendChild(card);
  });
}



/* --------------------- MODAL DE REPRODUCCIÓN --------------------- */

function openMovie(movie) {
  const modal = document.getElementById("movie_modal");
  const video = document.getElementById("video_player");
  const banner = document.getElementById("modal_banner");

  banner.style.backgroundImage = `url('${movie.cover}')`;
  video.src = movie.video;
  video.classList.add("hidden");
  video.pause();
  modal.classList.add("open");
}const MODAL_BANNER = el("modal_banner");
const BTN_PLAY = el("btn_play");
const BTN_CLOSE_MODAL = el("btn_close_modal");
const BTN_CLOSE_SETTINGS = el("btn_close_settings");

// NAV
const NAV_INICIO = el("nav_inicio");
const NAV_SERIES = el("nav_series");
const NAV_PELICULAS = el("nav_peliculas");

// Fake Content (24h challenge)
const MOVIES = [
  {
    id: 1,
    title: "BigMovieSerie",
    thumb: "BigMovieSerie.png",
    banner: "BigMovieSerie.png",
    video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "inicio"
  },
  {
    id: 2,
    title: "El Gato Samurai",
    thumb: "Movie2.png",
    banner: "Movie2.png",
    video: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    category: "peliculas"
  },
  {
    id: 3,
    title: "Catventure",
    thumb: "Movie3.png",
    banner: "Movie3.png",
    video: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    category: "series"
  }
];

let currentUser = load("catflix_user", null);

// UI Helpers
function showLogin() {
  LOGIN_AREA.style.display = "block";
}
function hideLogin() {
  LOGIN_AREA.style.display = "none";
}
function showWelcome() {
  WELCOME.style.display = "flex";
}
function hideWelcome() {
  WELCOME.style.display = "none";
}
function openModal(modal) {
  modal.style.display = "flex";
}
function closeModal(modal) {
  modal.style.display = "none";
}

// AUTH
function register() {
  if (!NEW_USER.value || !NEW_PASS.value) return alert("Llena ambos campos");
  const user = {
    username: NEW_USER.value,
    password: NEW_PASS.value,
    avatar: "default-avatar.png"
  };
  save("catflix_user", user);
  currentUser = user;
  updateUserUI();
  hideWelcome();
}

function login() {
  const stored = load("catflix_user", null);
  if (!stored) return alert("No existe una cuenta registrada.");

  if (
    LOGIN_USER.value === stored.username &&
    LOGIN_PASS.value === stored.password
  ) {
    currentUser = stored;
    hideWelcome();
    updateUserUI();
  } else {
    alert("Datos incorrectos");
  }
}

function logout() {
  localStorage.removeItem("catflix_user");
  currentUser = null;
  showWelcome();
}

// UI Updates
function updateUserUI() {
  WELCOME_TEXT.textContent = "Hola, " + currentUser.username;
  AVATAR_IMG.src = currentUser.avatar;
}

// AVATAR
function saveAvatar() {
  const file = AVATAR_INPUT.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    currentUser.avatar = reader.result;
    save("catflix_user", currentUser);
    updateUserUI();
  };
  reader.readAsDataURL(file);
}

// MOVIES
function loadMovies(filter = "inicio") {
  MOVIE_GRID.innerHTML = "";

  const list = MOVIES.filter(m =>
    filter === "inicio" ? true : m.category === filter
  );

  list.forEach(movie => {
    const div = document.createElement("div");
    div.className = "cardmovie";
    div.innerHTML = `
      <img src="${movie.thumb}" alt="${movie.title}">
      <div class="title">${movie.title}</div>
    `;
    div.onclick = () => openMovie(movie);
    MOVIE_GRID.appendChild(div);
  });
}

function openMovie(movie) {
  MODAL_BANNER.style.backgroundImage = `url('${movie.banner}')`;
  VIDEO_PLAYER.src = movie.video;
  VIDEO_PLAYER.style.display = "none";
  openModal(MOVIE_MODAL);

  BTN_PLAY.onclick = () => {
    VIDEO_PLAYER.style.display = "block";
    VIDEO_PLAYER.play();
  };
}

// NAVIGATION
function setActive(nav) {
  [NAV_INICIO, NAV_SERIES, NAV_PELICULAS].forEach(e =>
    e.classList.remove("active")
  );
  nav.classList.add("active");
}

NAV_INICIO.onclick = () => {
  setActive(NAV_INICIO);
  loadMovies("inicio");
};

NAV_SERIES.onclick = () => {
  setActive(NAV_SERIES);
  loadMovies("series");
};

NAV_PELICULAS.onclick = () => {
  setActive(NAV_PELICULAS);
  loadMovies("peliculas");
};

// EVENTS
BTN_REGISTER.onclick = register;
BTN_LOGIN.onclick = login;
BTN_LOGOUT.onclick = logout;

BTN_SHOW_LOGIN.onclick = showLogin;
BTN_SHOW_REGISTER.onclick = hideLogin;

BTN_AJUSTES.onclick = () => openModal(SETTINGS_MODAL);
BTN_CLOSE_SETTINGS.onclick = () => closeModal(SETTINGS_MODAL);

BTN_SAVE_AVATAR.onclick = saveAvatar;

BTN_CLOSE_MODAL.onclick = () => {
  VIDEO_PLAYER.pause();
  closeModal(MOVIE_MODAL);
};

// INIT
if (currentUser) {
  hideWelcome();
  updateUserUI();
} else {
  showWelcome();
}

loadMovies();
