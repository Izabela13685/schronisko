/****************************************************************************/
/* 1. Router SPA                                                            */
/****************************************************************************/
function router() {
  const app = document.getElementById('app');
  const routes = {
    '/': '<h1>Witamy w Schronisku "Druga Szansa"</h1><p>Nasza misja to pomoc zwierzętom w potrzebie.</p>',
    '/o-nas': '<h1>O nas</h1><p>Schronisko "Druga Szansa" powstało z myślą o pomocy zwierzętom w potrzebie.</p>',
    '/mapa': '<h1>Mapa dojazdu</h1><p>Adres: ul. Zwierzęca 1, 00-001 Miasto</p>',
    '/tworcy': '<h1>Twórcy strony</h1><p>Ernest 160788 i Izabela 160872</p>',
    '/ogloszenia': `
      <h1>Ogłoszenia</h1>
      <div id="announcements-form-wrapper">
        <form id="announcement-form">
          <label for="animal-type">Rodzaj zwierzaka:</label>
          <select id="animal-type">
            <option value="Pies">Pies</option>
            <option value="Kot">Kot</option>
            <option value="Inne">Inne</option>
          </select>

          <label for="animal-name">Imię:</label>
          <input type="text" id="animal-name" placeholder="Wpisz imię zwierzaka" required />

          <label for="animal-desc">Opis:</label>
          <textarea id="animal-desc" placeholder="Kilka słów o zwierzaku" required></textarea>

          <label for="animal-phone">Telefon kontaktowy:</label>
          <input type="text" id="animal-phone" placeholder="123 456 789" required />

          <label for="animal-image">Zdjęcie zwierzaka:</label>
          <input type="file" id="animal-image" accept="image/*" />

          <button type="submit">Dodaj ogłoszenie</button>
        </form>
      </div>
      <div id="announcements-list"></div>
    `,
  };

  const hash = window.location.hash.substring(1) || '/';
  app.innerHTML = routes[hash] || '<h1>404 - Nie znaleziono</h1>';

  if (hash === '/ogloszenia') initAnnouncements();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

/****************************************************************************/
/* 2. Ogłoszenia                                                            */
/****************************************************************************/
function initAnnouncements() {
  const formWrapper = document.getElementById('announcements-form-wrapper');
  const form = document.getElementById('announcement-form');
  const announcementsList = document.getElementById('announcements-list');

  // Pokazuj formularz tylko dla administratora
  if (localStorage.getItem('isAdmin') === 'true') {
    formWrapper.style.display = 'block';
  } else {
    formWrapper.style.display = 'none';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const animalType = document.getElementById('animal-type').value;
    const animalName = document.getElementById('animal-name').value.trim();
    const animalDesc = document.getElementById('animal-desc').value.trim();
    const animalPhone = document.getElementById('animal-phone').value.trim();
    const animalImageInput = document.getElementById('animal-image');
    let animalImage = '';

    if (animalImageInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        animalImage = e.target.result;
        saveAnnouncement({ animalType, animalName, animalDesc, animalPhone, animalImage });
      };
      reader.readAsDataURL(animalImageInput.files[0]);
    } else {
      saveAnnouncement({ animalType, animalName, animalDesc, animalPhone, animalImage });
    }
  });

  renderAnnouncements();
}

function saveAnnouncement(data) {
  const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
  announcements.push(data);
  localStorage.setItem('announcements', JSON.stringify(announcements));
  renderAnnouncements();
}

function renderAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
  const announcementsList = document.getElementById('announcements-list');
  announcementsList.innerHTML = '';

  if (announcements.length === 0) {
    announcementsList.innerHTML = '<p>Brak ogłoszeń do wyświetlenia.</p>';
    return;
  }

  announcements.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('announcement-item');
    div.innerHTML = `
      <h3>${item.animalName} (${item.animalType})</h3>
      <p>${item.animalDesc}</p>
      <p>Kontakt: ${item.animalPhone}</p>
      ${item.animalImage ? `<img src="${item.animalImage}" alt="${item.animalName}" style="max-width:200px;">` : ''}
    `;
    announcementsList.appendChild(div);
  });
}


