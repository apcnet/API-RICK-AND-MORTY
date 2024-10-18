const imagem = document.getElementById("imagem");
const nome = document.getElementById("nome");
const info = document.getElementById('info');
const txtBuscar = document.getElementById('txtBuscar');
const button = document.querySelector('button');

button.addEventListener('click', () => {
    const searchTerm = txtBuscar.value;
    const url = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const personagem = data.results[0];
                nome.textContent = personagem.name;
                info.textContent = `Status: ${personagem.status} | Espécie: ${personagem.species} `;
                imagem.src = personagem.image;
            } else {
                nome.textContent = "Personagem não encontrado.";
                info.textContent = "";
                imagem.src = "";
            }
        })
        .catch(error => {
            console.error('Erro ao buscar personagem:', error);
        });
});

