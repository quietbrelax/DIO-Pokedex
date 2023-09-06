const pokemonDet = document.getElementById("Detalhamento")

function convertPokeApiToCompletePokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.species = pokeDetail.name
    
    //const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    //const [type] = types

    //pokemon.types = types
    //pokemon.type = type

    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.number}.svg`

    pokemon.generation = pokeDetail.generation.name
    pokemon.baseHappiness = pokeDetail.base_happiness

    const eggs = pokeDetail.egg_groups.map((typeSlot) => typeSlot.name)
    pokemon.eggGroups = eggs

    const names = pokeDetail.names.map((typeSlot) => typeSlot.name)
    pokemon.namesList = names

    pokemon.habitat = pokeDetail.habitat.name
    return pokemon
}

function convertPokemonToHtml(pokemon){
   
    return `<div>
                <div class="BasicInformation">
                    <div class="Identification">
                        <h1>${pokemon.species}</h1>
                        <span class="number"> #${pokemon.number} </span>
                    </div>
                    <div class="detail">
                        
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </div>
            </div>
            
            
            <div class="Informacoes">
                <h3>About</h3>
            <div class="About">
                <ol class="Parametros">
        
                    <li class = "ElementosGerais">Species</li>
                    <li class = "ElementosGerais">Generation</li>
                    <li class = "ListaNomes">Name List</li>
                    
                </ol>
                <ol class="Valores">
            
                    <li class = "ElementosGerais">${pokemon.species}</li>
                    <li class = "ElementosGerais">${pokemon.generation}</li>
                    <li class = "ElementosGerais">
                        <ol>
                        ${pokemon.namesList.map((name) => `<li class="type ${name}">${name}</li>`).join('')}
                        </ol>
                    </li>
                    
                </ol>
            </div>
        
            <h3>Other Information</h3>
            <div class="Breeding">
                <ol class="Parametros">
        
                    <li class = "ElementosGerais">Base Happiness</li>
                    <li class = "ElementosGerais">Egg Groups</li>
                    <li class = "ElementosGerais">Habitat</li>
                    
                </ol>
                <ol class="Valores">
            
                    <li class = "ElementosGerais">${pokemon.baseHappiness}</li>
                    <li class = "ElementosGerais"> 
                        <ol>
                            ${pokemon.eggGroups.map((groups) => `<li class="type ${groups}">${groups}</li>`).join('')}
                        </ol>
                    </li>
                    <li class = "ElementosGerais">${pokemon.habitat}</li>
                    
                </ol>
            </div>
            </div>
        
        
        `
    }

const {
    host, hostname, href, origin, pathname, port, protocol, search
  } = window.location

  console.log(search);
  var element = ''

  for (const i in search) {
    if (search[i] != '?') {
        element += search[i];
    }
  }

  console.log(element);

  const url = `https://pokeapi.co/api/v2/pokemon-species/${element}/`

  console.log(url)


   fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiToCompletePokemon) 
    .then((pokemon) => {
        const newHtml = convertPokemonToHtml(pokemon);
        pokemonDet.innerHTML += newHtml
    } )
