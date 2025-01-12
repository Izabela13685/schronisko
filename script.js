// Baner cookies
const cookieBanner = document.getElementById('cookie-banner');
if (localStorage.getItem('cookieAccepted')) {
  cookieBanner.style.display = 'none';
} else {
  document.getElementById('cookie-button').addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieBanner.style.display = 'none';
  });
}

// Router SPA
function router() {
  const app = document.getElementById('app');
  const routes = {
    '/': '<h1>Witamy w Schronisku "Druga Szansa"</h1><p>Nasza misja to pomoc zwierzętom w potrzebie.</p>',
    '/o-nas': '<h1>O nas</h1><p>Schronisko "Druga Szansa" pomaga zwierzętom.</p>',
    '/mapa': '<h1>Mapa dojazdu</h1><p>Adres: ul. Zwierzęca 1, 00-001 Miasto</p>',
    '/tworcy': '<h1>Twórcy strony</h1><p>Ernest 160788 i Izabela 160872</p>',
    '/ogloszenia': `
      <h1>Ogłoszenia adopcyjne</h1>
      <p>Aby dodać nowe ogłoszenie, zaloguj się jako administrator.</p>
      <div id="announcements-form-wrapper">
        <label for="animal-name">Imię:</label>
        <input type="text" id="animal-name" />
        <label for="animal-desc">Opis:</label>
        <textarea id="animal-desc"></textarea>
        <button id="add-announcement-btn">Dodaj ogłoszenie</button>
      </div>
      <div id="announcements-list"></div>
    `,
  };

  const hash = window.location.hash.substring(1) || '/';
  app.innerHTML = routes[hash] || '<h1>404 - Nie znaleziono</h1>';

  if (hash === '/ogloszenia') initAnnouncements();
}

function initAnnouncements() {
  const formWrapper = document.getElementById('announcements-form-wrapper');
  const announcementsList = document.getElementById('announcements-list');
  const addBtn = document.getElementById('add-announcement-btn');

  // Pokaż formularz tylko dla administratora
  if (localStorage.getItem('isAdmin') === 'true') {
    formWrapper.style.display = 'block';
  } else {
    formWrapper.style.display = 'none';
  }

  addBtn.addEventListener('click', () => {
    const name = document.getElementById('animal-name').value;
    const desc = document.getElementById('animal-desc').value;

    if (!name || !desc) {
      alert('Wypełnij wszystkie pola!');
      return;
    }

    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    announcements.push({ name, desc });
    localStorage.setItem('announcements', JSON.stringify(announcements));
    renderAnnouncements();
  });

  renderAnnouncements();
}

function renderAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
  const announcementsList = document.getElementById('announcements-list');
  announcementsList.innerHTML = announcements
    .map(
      (a) => `
      <div class="announcement-item">
        <h3>${a.name}</h3>
        <p>${a.desc}</p>
      </div>
    `
    )
    .join('');
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);


