const lightThemeButton = document.querySelector('#light-theme');
const darkThemeButton = document.querySelector('#dark-theme');
const clearPreferenceButton = document.querySelector('#clear-preference');
const status = document.querySelector('#status');
const preferenceKey = 'theme-preference';

function applyTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
  localStorage.setItem(preferenceKey, theme);
}

function showStatus(message) {
  status.textContent = message;
}

lightThemeButton.addEventListener('click', () => {
  applyTheme('light');
  showStatus('Light theme selected.');
});

darkThemeButton.addEventListener('click', () => {
  applyTheme('dark');
  showStatus('Dark theme selected.');
});

clearPreferenceButton.addEventListener('click', () => {
  localStorage.removeItem(preferenceKey);
  document.body.classList.remove('dark-theme');
  showStatus('Theme preference cleared.');
});

const savedTheme = localStorage.getItem(preferenceKey);
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}
