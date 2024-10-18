const imagem = document.getElementById("imagem");
const nome = document.getElementById("nome");
const info = document.getElementById('info');
const txtBuscar = document.getElementById('txtBuscar');
const button = document.querySelector('button');

// Função para traduzir os valores da API para português
function traduzirStatus(status) {
    switch (status) {
        case 'Alive':
            return 'Vivo';
        case 'Dead':
            return 'Morto';
        case 'unknown':
            return 'Desconhecido';
        default:
            return status;
    }
}

function traduzirEspecie(species) {
    switch (species) {
        case 'Human':
            return 'Humano';
        case 'Alien':
            return 'Alienígena';
        default:
            return species;
    }
}

function traduzirGenero(gender) {
    switch (gender) {
        case 'Male':
            return 'Masculino';
        case 'Female':
            return 'Feminino';
        case 'Genderless':
            return 'Sem gênero';
        case 'unknown':
            return 'Desconhecido';
        default:
            return gender;
    }
}

// Função para realizar a busca
function realizarBusca() {
    const searchTerm = txtBuscar.value;
    let url;

    // Verifica se o termo de busca é um número (ID) ou string (nome)
    if (!isNaN(searchTerm)) {
        // Se for número, busca por ID
        url = `https://rickandmortyapi.com/api/character/${searchTerm}`;
    } else {
        // Se for string, busca por nome
        url = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Para busca por nome, data.results é uma array, para busca por ID, data já é o personagem
            const personagem = data.results ? data.results[0] : data;

            if (personagem) {
                nome.textContent = personagem.name;
                info.textContent = `Status: ${traduzirStatus(personagem.status)} | Espécie: ${traduzirEspecie(personagem.species)} | Gênero: ${traduzirGenero(personagem.gender)} | Tipo: ${personagem.type || 'N/A'} | Origem: ${personagem.origin.name}`;
                imagem.src = personagem.image;
            } else {
                nome.textContent = "Personagem não encontrado.";
                info.textContent = "";
                imagem.src = "";
            }
        })
        .catch(error => {
            console.error('Erro ao buscar personagem:', error);
            nome.textContent = "Erro ao buscar personagem.";
            info.textContent = "";
            imagem.src = "";
        });
}

// Escuta o evento de clique no botão
button.addEventListener('click', realizarBusca);

// Escuta o evento de pressionar a tecla Enter no campo de texto
txtBuscar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        realizarBusca();
    }
});