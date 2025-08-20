const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = './artists.json'; // pega o arquivo local hospedado no GitHub Pages
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const filtered = data.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm)
            );
            displayResults(filtered, searchTerm);
        })
        .catch((err) => {
            console.error("Erro ao carregar artists.json:", err);
        });
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    if (result.length === 0) {
        gridContainer.innerHTML = `<p>Nenhum artista encontrado para "${searchTerm}"</p>`;
    }

    result.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = 
            `<div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">              
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>`;
        gridContainer.appendChild(artistCard);
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});
