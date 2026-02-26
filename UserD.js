const grid = document.getElementById('userGrid');
const searchInput = document.getElementById('searchInput');
let allUsers = [];

async function fetchUsers() {
  try {

    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();

    allUsers = users.slice(0, 6);
    renderCards(allUsers);

  } catch (error) {
    showError();
    console.error('Fetch gagal:', error);
  }
}

function showError() {
  grid.innerHTML = `
    <div class="error-box">
      <span class="error-icon">⚠️</span>
      <div class="error-title">Maaf, data gagal dimuat</div>
      <div class="error-desc">Periksa koneksi internet kamu dan coba lagi.</div>
      <button class="retry-btn" onclick="fetchUsers()">🔄 Coba Lagi</button>
    </div>
  `;
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('');
}

function renderCards(users) {
  if (users.length === 0) {
    grid.innerHTML = `<div class="empty"><span>🔍</span>Tidak ada hasil ditemukan.</div>`;
    return;
  }

  grid.innerHTML = users.map(user => `
    <div class="card">
      <div class="avatar">${getInitials(user.name)}</div>

      <!-- POIN 2: Nama user -->
      <div class="card-name">${user.name}</div>

      <div class="card-info">

        <!-- POIN 2: Email user -->
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">${user.email}</div>
        </div>

        <!-- POIN 2: Nama Perusahaan -->
        <div class="info-item">
          <div class="info-label">Perusahaan</div>
          <div class="info-value">${user.company.name}</div>
        </div>

      </div>
    </div>
  `).join('');
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = allUsers.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.company.name.toLowerCase().includes(query)
  );
  renderCards(filtered);
});

fetchUsers();   