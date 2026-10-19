const pageTheme = document.getElementById('pageTheme');

function applyTheme(theme) {
  document.body.classList.remove('dark', 'blue');

  if (theme === 'dark') {
    document.body.classList.add('dark');
  }

  if (theme === 'blue') {
    document.body.classList.add('blue');
  }

  pageTheme.value = theme;
}

function loadTheme() {
  const preferences = JSON.parse(
    localStorage.getItem('seminarPreferences') || 'null'
  );

  applyTheme(preferences?.theme || 'light');
}

pageTheme.addEventListener('change', () => {
  applyTheme(pageTheme.value);

  const preferences = JSON.parse(
    localStorage.getItem('seminarPreferences') || '{}'
  );

  preferences.theme = pageTheme.value;

  localStorage.setItem(
    'seminarPreferences',
    JSON.stringify(preferences)
  );
});

function removeRow(button) {
  button.closest('tr').remove();
}

function toggleForm() {
  document.getElementById('form').classList.toggle('show');
}

function addSession() {
  const time = document.getElementById('time').value.trim();
  const topic = document.getElementById('topic').value.trim();
  const speaker = document.getElementById('speaker').value.trim() || '—';
  const room = document.getElementById('room').value.trim();
  const status = document.getElementById('status').value;

  if (!time || !topic || !room) {
    alert('Please enter the time, topic and room.');
    return;
  }

  const labels = {
    pending: 'pending',
    progress: 'in progress',
    completed: 'completed'
  };

  const row = document.createElement('tr');

  row.innerHTML = `
    <td class="time">${escapeHtml(time)}</td>
    <td>${escapeHtml(topic)}</td>
    <td>${escapeHtml(speaker)}</td>
    <td>${escapeHtml(room)}</td>
    <td>
      <span class="status ${status}">
        ${labels[status]}
      </span>
    </td>
    <td>
      <button class="delete" onclick="removeRow(this)">
        Delete
      </button>
    </td>
  `;

  document.getElementById('rows').appendChild(row);

  document.getElementById('time').value = '';
  document.getElementById('topic').value = '';
  document.getElementById('speaker').value = '';
  document.getElementById('room').value = '';
  document.getElementById('status').value = 'pending';
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (character) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[character];
  });
}

loadTheme();
