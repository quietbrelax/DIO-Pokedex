const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")

const maxRecords = 151
const limit = 12
let offset = 0

function convertPokemonToLi(pokemon){
   
return `<li id = "pokemon${pokemon.number}" class="pokemon ${pokemon.type}" onclick="location.href = 'http://127.0.0.1:5500/detalhes.html?${pokemon.number}';">
            <span class="number"> #${pokemon.number} </span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">

                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}

                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

        </li>`
}

function loadPokemonItens(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((convertPokemonToLi)).join('');
        pokemonList.innerHTML += newHtml
    } )
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit
    if (qtdRecord >= maxRecords) {
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    }
    else{
        loadPokemonItens(offset, limit)
    }
    
})