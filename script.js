const repositoryList = document.querySelector('#repository-list');
const statusMessage = document.querySelector('#status');

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium'
  }).format(new Date(`${date}T00:00:00`));
}

function formatStars(stars) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(stars);
}

function renderRepositories(repositories) {
  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repository">
      <div>
        <h2><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.repository}</a></h2>
        <p>${repository.description}</p>
      </div>
      <div class="repository-meta">
        <span>${repository.language}</span>
        <span>${formatStars(repository.stars)} stars</span>
        <span>Starred ${formatDate(repository.starredAt)}</span>
      </div>
    </li>
  `).join('');
  statusMessage.hidden = true;
}

async function loadRepositories() {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    statusMessage.textContent = 'The starred repositories could not be loaded.';
    statusMessage.dataset.error = 'true';
    console.error(error);
  }
}

loadRepositories();
