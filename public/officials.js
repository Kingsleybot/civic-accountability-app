let allOfficials = [];

async function loadOfficials() {
  const response = await fetch('/api/officials');
  allOfficials = await response.json();
  renderOfficials(allOfficials);
}

function renderOfficials(list) {
  const container = document.getElementById('officialsList');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p>No officials match your search.</p>';
    return;
  }

  list.forEach(official => {
    const card = document.createElement('div');
    card.className = 'official-card';
    card.innerHTML = `
      <h3>${official.name}</h3>
      <p><strong>Role:</strong> ${official.role}</p>
      <p><strong>Constituency:</strong> ${official.constituency}</p>
      <p><strong>Party:</strong> ${official.party}</p>
    `;
    container.appendChild(card);
  });
}

function filterOfficials(query) {
  const lowerQuery = query.toLowerCase();
  return allOfficials.filter(official =>
    official.name.toLowerCase().includes(lowerQuery) ||
    official.role.toLowerCase().includes(lowerQuery) ||
    official.constituency.toLowerCase().includes(lowerQuery) ||
    official.party.toLowerCase().includes(lowerQuery)
  );
}

document.getElementById('searchBox').addEventListener('input', (e) => {
  const filtered = filterOfficials(e.target.value);
  renderOfficials(filtered);
});

loadOfficials();