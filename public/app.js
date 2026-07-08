const titleEl = document.getElementById('title');
const taglineEl = document.getElementById('tagline');
const languageSelect = document.getElementById('languageSelect');

async function loadLanguage(lang) {
  const response = await fetch(`locales/${lang}.json`);
  const data = await response.json();
  titleEl.textContent = data.title;
  taglineEl.textContent = data.tagline;
  localStorage.setItem('preferredLanguage', lang);
}

languageSelect.addEventListener('change', (e) => {
  loadLanguage(e.target.value);
});

// Load saved language, or default to English
const savedLang = localStorage.getItem('preferredLanguage') || 'en';
languageSelect.value = savedLang;
loadLanguage(savedLang);