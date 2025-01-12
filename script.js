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
const bannerImageElement = document.getElementById('banner-image');
const bannerDotsContainer = document.getElementById('banner-dots');

function initBanner() {
  bannerDotsContainer.innerHTML = '';
  bannerImages.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => {
      currentBannerIndex = i;
      updateBanner();
    });
    bannerDotsContainer.appendChild(dot);
  });
  updateBanner();
}

function updateBanner() {
  bannerImageElement.src = bannerImages[currentBannerIndex];
  const dots = bannerDotsContainer.querySelectorAll('span');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentBannerIndex);
  });
}
initBanner();

/****************************************************************************/
/* 3. Router SPA                                                            */
/****************************************************************************/
function router() {
  const lang = getLanguage();
  let hash = window.location.hash.substring(1) || '/';
  const routeContent = texts[lang].routes[hash] || texts[lang].noRoute;
  document.getElementById('app').innerHTML = routeContent;

  if (hash === '/ogloszenia') {
    initAnnouncements();
  } else if (hash === '/login') {
    initLogin();
  } else if (hash === '/logout') {
    performLogout();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

/****************************************************************************/
/* 4. Admin – stan isAdmin w localStorage                                   */
/****************************************************************************/
function isAdmin() {
  return localStorage.getItem('isAdmin') === 'true';
}
function performLogout() {
  localStorage.removeItem('isAdmin');
  window.location.hash = '/';
}

/****************************************************************************/
/* 5. Logowanie administratora                                              */
/****************************************************************************/
function initLogin() {
  const loginMessage = document.getElementById('login-message');
  const loginBtn = document.getElementById('admin-login-btn');

  if (isAdmin()) {
    loginMessage.style.color = 'green';
    loginMessage.textContent = 'Jesteś już zalogowany jako administrator.';
    return;
  }

  loginBtn.addEventListener('click', () => {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAdmin', 'true');
      loginMessage.style.color = 'green';
      loginMessage.textContent = 'Zalogowano pomyślnie!';
      setTimeout(() => {
        window.location.hash = '/ogloszenia';
      }, 1000);
    } else {
      loginMessage.style.color = 'red';
      loginMessage.textContent = 'Nieprawidłowe dane logowania.';
    }
  });
}

/****************************************************************************/
/* 6. Ogłoszenia                                                            */
/****************************************************************************/
function initAnnouncements() {
  const formWrapper = document.getElementById('announcements-form-wrapper');
  const announcementsList = document.getElementById('announcements-list');
  const addBtn = document.getElementById('add-announcement-btn');

  if (isAdmin()) {
    formWrapper.style.display = 'block';
    addBtn.addEventListener('click', onAddAnnouncement);
  } else {
    formWrapper.style.display = 'none';
  }

  renderAnnouncements();

  function onAddAnnouncement() {
    const animalType = document.getElementById('animal-type').value;
    const animalName = document.getElementById('animal-name').value.trim();
    const animalDesc = document.getElementById('animal-desc').value.trim();
    const animalPhone = document.getElementById('animal-phone').value.trim();
    const animalImageInput = document.getElementById('animal-image');

    if (!animalType || !animalName || !animalDesc || !animalPhone || !animalImageInput.files[0]) {
      alert('Proszę uzupełnić wszystkie pola formularza.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const base64Img = event.target.result;
      const newItem = {
        type: animalType,
        name: animalName,
        desc: animalDesc,
        phone: animalPhone,
        image: base64Img,
        date: new Date().toLocaleString(),
      };

      const data = getAnnouncementsData();
      data.push(newItem);
      saveAnnouncementsData(data);

      document.getElementById('animal-name').value = '';
      document.getElementById('animal-desc').value = '';
      document.getElementById('animal-phone').value = '';
      animalImageInput.value = '';
      renderAnnouncements();
    };
    reader.readAsDataURL(animalImageInput.files[0]);
  }

  function renderAnnouncements() {
    const data = getAnnouncementsData();
    announcementsList.innerHTML = '';

    if (data.length === 0) {
      announcementsList.innerHTML = '<p>Brak ogłoszeń.</p>';
      return;
    }

    data.forEach((item) => {
      const div = document.createElement('div');
      div.classList.add('announcement-item');

      div.innerHTML = `
        <h4>${item.name} (${item.type})</h4>
        <img src="${item.image}" alt="${item.name}" style="max-width:100%; max-height:200px; display:block; margin-bottom:5px;">
        <div class="announcement-description">${item.desc}</div>
        <div>Kontakt: <strong>${item.phone}</strong></div>
        <div class="announcement-date">Dodano: ${item.date}</div>
      `;
      announcementsList.appendChild(div);
    });
  }

  function getAnnouncementsData() {
    const stored = localStorage.getItem('announcements');
    return stored ? JSON.parse(stored) : [];
  }
  function saveAnnouncementsData(data) {
    localStorage.setItem('announcements', JSON.stringify(data));
  }
}

