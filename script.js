/******************************************************************************/
/* 1. Baner cookies                                                           */
/******************************************************************************/
const cookieBanner = document.getElementById('cookie-banner');
if (localStorage.getItem('cookieAccepted')) {
  cookieBanner.style.display = 'none';
} else {
  document.getElementById('cookie-button').addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieBanner.style.display = 'none';
  });
}

/******************************************************************************/
/* 2. Slider (baner) – lokalne pliki JPG                                      */
/******************************************************************************/
const bannerImages = [
  'img/pies01.jpg',
  'img/kot01.jpg',
  'img/front01.jpg'
];
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

// Możliwe automatyczne przełączanie co 5 sekund:
// setInterval(() => {
//   currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;
//   updateBanner();
// }, 5000);

initBanner();

/******************************************************************************/
/* 3. Obsługa języka (PL / EN)                                               */
/******************************************************************************/
function getLanguage() {
  return localStorage.getItem('lang') || 'pl';
}

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  router(); // odśwież zawartość
}

document.getElementById('language-select').addEventListener('change', e => {
  setLanguage(e.target.value);
});
document.getElementById('language-select').value = getLanguage();

/******************************************************************************/
/* 4. Teksty w 2 językach                                                    */
/******************************************************************************/
const texts = {
  pl: {
    routes: {
      '/': `
        <h1>Witamy w Schronisku "Druga Szansa"</h1>
        <p>
          Naszą misją jest dawanie drugiej szansy na szczęśliwe życie zwierzakom
          w potrzebie. Znajdziesz u nas psy, koty i inne zwierzęta
          poszukujące kochającego domu.
        </p>
      `,
      '/o-nas': `
        <h1>O nas</h1>
        <p>
          Schronisko "Druga Szansa" powstało z myślą o pomocy porzuconym i
          potrzebującym zwierzętom.
        </p>
      `,
      '/mapa': `
        <h1>Mapa dojazdu</h1>
        <p>Możesz odwiedzić nasze schronisko pod poniższym adresem (mapa niżej).</p>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.181383507984!2d21.003928815803948!3d52.22967597975706!2m3!1f0!2f0!3f0!
                 3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc9817262c17%3A0x744a38fe0a9a2dd6!2sPa%C5%82ac%20Kultury%20i%20Nauki!
                 5e0!3m2!1spl!2spl!4v1677760000000!5m2!1spl!2spl"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      `,
      '/tworcy': `
        <h1>Twórcy strony</h1>
        <p>Ernest 160788 i Izabela 160872</p>
      `,
      '/ogloszenia': `
        <h1>Ogłoszenia adopcyjne</h1>
        <p>
          Poniżej znajdują się aktualne ogłoszenia.
          Aby dodać nowe – musisz być zalogowany jako administrator (#/login).
        </p>
        <div id="announcements-form-wrapper">
          <div class="form-row">
            <label for="animal-type">Rodzaj zwierzaka</label>
            <select id="animal-type">
              <option value="Pies">Pies</option>
              <option value="Kot">Kot</option>
              <option value="Inne">Inne</option>
            </select>
          </div>

          <div class="form-row">
            <label for="animal-name">Imię</label>
            <input type="text" id="animal-name" placeholder="Wpisz imię zwierzaka" />
          </div>

          <div class="form-row">
            <label for="animal-desc">Opis</label>
            <textarea id="animal-desc" rows="4" placeholder="Kilka słów o zwierzaku"></textarea>
          </div>

          <div class="form-row">
            <label for="animal-phone">Telefon kontaktowy</label>
            <input type="text" id="animal-phone" placeholder="123 456 789" />
          </div>

          <div class="form-row">
            <label for="animal-image">Zdjęcie zwierzaka</label>
            <input type="file" id="animal-image" accept="image/*" />
          </div>

          <button id="add-announcement-btn">Dodaj ogłoszenie</button>
        </div>

        <div id="announcements-list"></div>
      `,
      '/login': `
        <h1>Logowanie administratora</h1>
        <div class="form-row">
          <label for="admin-username">Nazwa użytkownika</label>
          <input type="text" id="admin-username" />
        </div>
        <div class="form-row">
          <label for="admin-password">Hasło</label>
          <input type="password" id="admin-password" />
        </div>
        <button id="admin-login-btn">Zaloguj</button>
        <p id="login-message"></p>
      `,
      '/logout': `<h1>Wylogowywanie...</h1>`
    },
    noRoute: `<h1>404</h1><p>Nie znaleziono podstrony.</p>`,
    loginSuccess: 'Zalogowano pomyślnie! Przekierowanie...',
    loginFailed: 'Nieprawidłowe dane logowania.',
    loginAlready: 'Jesteś już zalogowany jako administrator.',
    fillFields: 'Proszę uzupełnić wszystkie pola formularza.',
    noAnnouncements: 'Brak ogłoszeń.',
    addedOn: 'Dodano'
  },

  en: {
    routes: {
      '/': `
        <h1>Welcome to "Second Chance" Shelter</h1>
        <p>
          Our mission is to give animals in need a second chance at a happy life.
          We have dogs, cats, and other animals looking for a loving home.
        </p>
      `,
      '/o-nas': `
        <h1>About Us</h1>
        <p>
          "Second Chance" Shelter was created to help abandoned or needy animals.
        </p>
      `,
      '/mapa': `
        <h1>Map</h1>
        <p>You can visit our shelter at the address below (map shown here).</p>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.181383507984!2d21.003928815803948!3d52.22967597975706!2m3!1f0!2f0!3f0!
                 3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc9817262c17%3A0x744a38fe0a9a2dd6!2sPa%C5%82ac%20Kultury%20i%20Nauki!
                 5e0!3m2!1spl!2spl!4v1677760000000!5m2!1spl!2spl"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      `,
      '/tworcy': `
        <h1>Creators of the page</h1>
        <p>Ernest 160788 & Izabela 160872</p>
      `,
      '/ogloszenia': `
        <h1>Adoption Announcements</h1>
        <p>
          Below are the current announcements.
          To add new ones, you must be logged in as admin (#/login).
        </p>
        <div id="announcements-form-wrapper">
          <div class="form-row">
            <label for="animal-type">Animal type</label>
            <select id="animal-type">
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-row">
            <label for="animal-name">Name</label>
            <input type="text" id="animal-name" placeholder="Enter animal's name" />
          </div>

          <div class="form-row">
            <label for="animal-desc">Description</label>
            <textarea id="animal-desc" rows="4" placeholder="Some details about the animal"></textarea>
          </div>

          <div class="form-row">
            <label for="animal-phone">Contact phone</label>
            <input type="text" id="animal-phone" placeholder="123 456 789" />
          </div>

          <div class="form-row">
            <label for="animal-image">Animal picture</label>
            <input type="file" id="animal-image" accept="image/*" />
          </div>

          <button id="add-announcement-btn">Add Announcement</button>
        </div>

        <div id="announcements-list"></div>
      `,
      '/login': `
        <h1>Admin Login</h1>
        <div class="form-row">
          <label for="admin-username">Username</label>
          <input type="text" id="admin-username" />
        </div>
        <div class="form-row">
          <label for="admin-password">Password</label>
          <input type="password" id="admin-password" />
        </div>
        <button id="admin-login-btn">Login</button>
        <p id="login-message"></p>
      `,
      '/logout': `<h1>Logging out...</h1>`
    },
    noRoute: `<h1>404</h1><p>Page not found.</p>`,
    loginSuccess: 'Logged in successfully! Redirecting...',
    loginFailed: 'Invalid login data.',
    loginAlready: 'You are already logged in as an administrator.',
    fillFields: 'Please fill in all fields.',
    noAnnouncements: 'No announcements.',
    addedOn: 'Added on'
  }
};

/******************************************************************************/
/* 5. Router SPA (obsługa hash)                                              */
/******************************************************************************/
function router() {
  const lang = getLanguage();
  let hash = window.location.hash.substring(1) || '/';
  const routeContent = texts[lang].routes[hash] || texts[lang].noRoute;
  document.getElementById('app').innerHTML = routeContent;

  // Sprawdzamy, czy to podstrona login, logout czy ogloszenia
  if (hash === 'login') {
    initLogin();
  } else if (hash === 'logout') {
    performLogout();
  } else if (hash === 'ogloszenia') {
    initAnnouncements();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

/******************************************************************************/
/* 6. Admin – stan isAdmin w localStorage                                    */
/******************************************************************************/
function isAdmin() {
  return localStorage.getItem('isAdmin') === 'true';
}

function performLogout() {
  localStorage.removeItem('isAdmin');
  window.location.hash = '/';
}

/******************************************************************************/
/* 7. Logowanie (ukryte w menu)                                              */
/******************************************************************************/
function initLogin() {
  const lang = getLanguage();
  const loginMessage = document.getElementById('login-message');
  const loginBtn = document.getElementById('admin-login-btn');

  // Jeśli już zalogowany, wyświetlamy komunikat
  if (isAdmin()) {
    loginMessage.style.color = 'green';
    loginMessage.textContent = texts[lang].loginAlready;
    return;
  }

  // Dane logowania: admin / 1234
  loginBtn.addEventListener('click', () => {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAdmin', 'true');
      loginMessage.style.color = 'green';
      loginMessage.textContent = texts[lang].loginSuccess;
      setTimeout(() => {
        window.location.hash = '/ogloszenia';
      }, 1000);
    } else {
      loginMessage.style.color = 'red';
      loginMessage.textContent = texts[lang].loginFailed;
    }
  });
}

/******************************************************************************/
/* 8. Ogłoszenia – widoczne dla wszystkich, ale formularz tylko dla admina   */
/******************************************************************************/
function initAnnouncements() {
  const lang = getLanguage();
  const formWrapper = document.getElementById('announcements-form-wrapper');
  const announcementsList = document.getElementById('announcements-list');
  const addBtn = document.getElementById('add-announcement-btn');

  // Jeśli nie admin, ukrywamy formularz
  if (!isAdmin()) {
    formWrapper.style.display = 'none';
  } else {
    formWrapper.style.display = 'block';
    addBtn.addEventListener('click', onAddAnnouncement);
  }

  renderAnnouncements();

  // ----------------- Funkcje wewnętrzne -----------------
  function onAddAnnouncement() {
    const animalType = document.getElementById('animal-type').value;
    const animalName = document.getElementById('animal-name').value.trim();
    const animalDesc = document.getElementById('animal-desc').value.trim();
    const animalPhone = document.getElementById('animal-phone').value.trim();
    const animalImageInput = document.getElementById('animal-image');

    if (!animalType || !animalName || !animalDesc || !animalPhone || !animalImageInput.files[0]) {
      alert(texts[lang].fillFields);
      return;
    }

    // Konwersja pliku na Base64 (lokalnie w przeglądarce)
    const file = animalImageInput.files[0];
    const reader = new FileReader();
    reader.onload = function(evt) {
      const base64Img = evt.target.result;
      const newItem = {
        type: animalType,
        name: animalName,
        desc: animalDesc,
        phone: animalPhone,
        image: base64Img,
        date: new Date().toLocaleString()
      };
      const data = getAnnouncementsData();
      data.push(newItem);
      saveAnnouncementsData(data);

      // Czyszczenie
      document.getElementById('animal-name').value = '';
      document.getElementById('animal-desc').value = '';
      document.getElementById('animal-phone').value = '';
      animalImageInput.value = '';

      renderAnnouncements();
    };
    reader.readAsDataURL(file);
  }

  function renderAnnouncements() {
    const data = getAnnouncementsData();
    announcementsList.innerHTML = '';

    if (data.length === 0) {
      announcementsList.innerHTML = `<p>${texts[lang].noAnnouncements}</p>`;
      return;
    }

    data.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('announcement-item');

      let removeBtnHTML = '';
      if (isAdmin()) {
        removeBtnHTML = `
          <button class="remove-announcement-btn" data-index="${index}">X</button>
        `;
      }

      div.innerHTML = `
        <h4>${item.name}
          <span class="announcement-category">(${item.type})</span>
        </h4>
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          style="max-width:100%; max-height:200px; display:block; margin-bottom:5px;"
        >
        <div class="announcement-description">${item.desc}</div>
        <div>Tel: <strong>${item.phone}</strong></div>
        <div class="announcement-date">
          ${texts[lang].addedOn}: ${item.date}
        </div>
        ${removeBtnHTML}
      `;
      announcementsList.appendChild(div);
    });

    // Obsługa przycisku Usuń (tylko dla admina)
    if (isAdmin()) {
      announcementsList.querySelectorAll('.remove-announcement-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          const idx = parseInt(e.target.getAttribute('data-index'), 10);
          removeAnnouncement(idx);
        });
      });
    }
  }

  function removeAnnouncement(idx) {
    const data = getAnnouncementsData();
    data.splice(idx, 1);
    saveAnnouncementsData(data);
    renderAnnouncements();
  }

  // Zapis i odczyt ogłoszeń z LocalStorage
  function getAnnouncementsData() {
    const stored = localStorage.getItem('announcements');
    return stored ? JSON.parse(stored) : [];
  }
  function saveAnnouncementsData(data) {
    localStorage.setItem('announcements', JSON.stringify(data));
  }
}

/******************************************************************************/
/* 9. Kontroler AJAX / API (apiController)                                   */
/******************************************************************************/
/**
 * Poniższy obiekt stanowi przykładowy „kontroler AJAX” (tzw. warstwę dostępu
 * do API). Możesz go dostosować do swojego prawdziwego endpointu i wywołań.
 */
const apiController = {
  // Adres bazowy do Twojego API
  baseUrl: 'https://example.com/api',

  /**
   * GET /animals
   */
  getAnimals: function () {
    return fetch(`${this.baseUrl}/animals`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      return response.json();
    });
  },

  /**
   * GET /animals/:id
   */
  getAnimalById: function (id) {
    return fetch(`${this.baseUrl}/animals/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      return response.json();
    });
  },

  /**
   * POST /animals
   */
  createAnimal: function (animalData) {
    return fetch(`${this.baseUrl}/animals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(animalData) // np. { name: 'Reksio', type: 'dog' }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      return response.json();
    });
  },

  /**
   * PUT /animals/:id
   */
  updateAnimal: function (id, animalData) {
    return fetch(`${this.baseUrl}/animals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(animalData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      return response.json();
    });
  },

  /**
   * DELETE /animals/:id
   */
  deleteAnimal: function (id) {
    return fetch(`${this.baseUrl}/animals/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      // W przypadku DELETE często jest np. 204 No Content
      // zwracamy np. response.text() czy response.json() – zależnie od API
      return response.text();
    });
  }
};



