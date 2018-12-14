document.addEventListener('DOMContentLoaded', () => {
  
  // Grabbed the data for pokemon.json
  fetch('http://localhost:3000/pokemon')
    .then(response => response.json())
    .then((pokemonArray) => {
      for (pokemon of pokemonArray){
        document.getElementById('pokemon-container').innerHTML += `<div class='pokemon-container'>
        <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class='center-text'> ${pokemon.name}</h1>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img data-id="${pokemonArray.indexOf(pokemon)}" data-action="flip" class="toggle-sprite"src="${pokemon.sprites.front}"/>
            </div>
          </div>
        </div>
      </div>`

      }
    })

    // Get all the pokemon cards from index.html
    const pokemonContainer = document.getElementById('pokemon-container')
    const pokemonInput = document.getElementById('pokemon-search-input')
    const pokemonFrame = document.getElementsByClassName('center-text')

    // flip the pokemon sprite when clicked
    pokemonContainer.addEventListener('click', (event) => {
      if (event.target.dataset.action === 'flip'){
        //fetched the data and changed image when clicked
        fetch('http://localhost:3000/pokemon')
        .then(response => response.json())
        .then((pokemonArray) => {
          let pokemon = pokemonArray.filter((pokemon) => {
           return (pokemon.sprites.front === event.target.src || pokemon.sprites.back === event.target.src) 
           })[0]

          if (pokemon.sprites.front === event.target.src){
            return event.target.src = pokemon.sprites.back
          }
          else if(pokemon.sprites.back === event.target.src){
            return event.target.src = pokemon.sprites.front
          }
        })
      }
      
    })

    pokemonInput.addEventListener('input', (event) => {
      let pokemonFrameArray = [...pokemonFrame]
      
      let filteredPokemon = pokemonFrameArray.filter((header) => {
        return header.textContent.includes(event.target.value)
      })

    })



  
  
})
