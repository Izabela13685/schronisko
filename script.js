/****************************************************************************/
/* 1. Baner cookies                                                         */
/****************************************************************************/
const cookieBanner = document.getElementById('cookie-banner');
if (localStorage.getItem('cookieAccepted')) {
  cookieBanner.style.display = 'none';
} else {
  document.getElementById('cookie-button').addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieBanner.style.display = 'none';
  });
}

/****************************************************************************/
/* 2. Slider (baner)                                                        */
/****************************************************************************/
const bannerImages = ['img/pies01.jpg', 'img/kot01.jpg', 'img/front01.jpg'];
let currentBannerIndex = 0;

function updateBanner() {
  const bannerImage = document.getElementById('banner-image');
  bannerImage.src = bannerImages[currentBannerIndex];
}

setInterval(() => {
  currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;
  updateBanner();
}, 5000);

/****************************************************************************/
/* 3. Router SPA                                                            */
/****************************************************************************/
function router() {
  const hash = window.location.hash.substring(1) || '/';
  const routes = {
    '/': '<h1>Witamy w Schronisku</h1><p>Strona główna.</p>',
    '/o-nas': '<h1>O nas</h1><p>Informacje o nas.</p>',
    '/ogloszenia': '<h1>Ogłoszenia</h1><div id="announcements"></div>',
    '/login': '<h1>Logowanie</h1><div id="login-form"></div>',
    '/logout': '<h1>Wylogowywanie...</h1>',
  };
  document.getElementById('app').innerHTML = routes[hash] || '<h1>404 - Nie znaleziono</h1>';
  if (hash === '/ogloszenia') initAnnouncements();
  if (hash === '/login') initLogin();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

/****************************************************************************/
/* 4. Logowanie                                                             */
/****************************************************************************/
function initLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div>
      <label for="username">Nazwa użytkownika:</label>
      <input type="text" id="username" />
    </div>
    <div>
      <label for="password">Hasło:</label>
      <input type="password" id="password" />
    </div>
    <button id="login-btn">Zaloguj</button>
  `;

  document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAdmin', 'true');
      alert('Zalogowano pomyślnie');
      window.location.hash = '/ogloszenia';
    } else {
      alert('Nieprawidłowe dane logowania');
    }
  });
}

/****************************************************************************/
/* 5. Ogłoszenia                                                            */
/****************************************************************************/
function initAnnouncements() {
  const app = document.getElementById('app');
  app.innerHTML += `
    <div>
      <button id="add-announcement-btn">Dodaj ogłoszenie</button>
    </div>
    <div id="announcements-list"></div>
  `;

  document.getElementById('add-announcement-btn').addEventListener('click', () => {
    const name = prompt('Podaj nazwę zwierzaka:');
    const desc = prompt('Podaj opis zwierzaka:');
    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    announcements.push({ name, desc });
    localStorage.setItem('announcements', JSON.stringify(announcements));
    renderAnnouncements();
  });

  renderAnnouncements();
}

function renderAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
  const list = document.getElementById('announcements-list');
  list.innerHTML = announcements
    .map((a) => `<div class="announcement-item"><h3>${a.name}</h3><p>${a.desc}</p></div>`)
    .join('');
}

