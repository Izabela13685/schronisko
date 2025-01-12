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

// Slider
const bannerImages = ['img/pies01.jpg', 'img/kot01.jpg', 'img/front01.jpg'];
let currentBannerIndex = 0;

function updateBanner() {
  const bannerImageElement = document.getElementById('banner-image');
  bannerImageElement.src = bannerImages[currentBannerIndex];
  const dots = document.querySelectorAll('#banner-dots span');
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentBannerIndex));
}

function initBanner() {
  const bannerDots = document.getElementById('banner-dots');
  bannerDots.innerHTML = bannerImages.map(() => '<span></span>').join('');
  bannerDots.querySelectorAll('span').forEach((dot, idx) =>
    dot.addEventListener('click', () => {
      currentBannerIndex = idx;
      updateBanner();
    })
  );
  updateBanner();
}
initBanner();

// Router
function router() {
  const routes = {
    '/': '<h1>Strona główna</h1><p>Witamy na stronie schroniska.</p>',
    '/o-nas': '<h1>O nas</h1><p>Informacje o schronisku.</p>',
    '/ogloszenia': '<h1>Ogłoszenia</h1><div id="announcements"></div>'
  };
  const hash = window.location.hash.substring(1) || '/';
  document.getElementById('app').innerHTML = routes[hash] || '<h1>404 - Nie znaleziono</h1>';
  if (hash === '/ogloszenia') initAnnouncements();
}
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Ogłoszenia
function initAnnouncements() {
  const announcementsDiv = document.getElementById('announcements');
  const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');

  announcementsDiv.innerHTML = announcements
    .map(
      (item, idx) => `
      <div class="announcement-item">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <button class="remove-announcement-btn" onclick="removeAnnouncement(${idx})">Usuń</button>
      </div>
    `
    )
    .join('');
}

function addAnnouncement() {
  const name = prompt('Podaj nazwę zwierzaka:');
  const desc = prompt('Podaj opis zwierzaka:');
  const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
  announcements.push({ name, desc });
  localStorage.setItem('announcements', JSON.stringify(announcements));
  router();
}

function removeAnnouncement(index) {
  const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
  announcements.splice(index, 1);
  localStorage.setItem('announcements', JSON.stringify(announcements));
  router();
}
