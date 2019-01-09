document.addEventListener('DOMContentLoaded', () => {
  // console.log(POKEMON)
  //YOUR CODE HERE
  let allPokemon = []
	const pokemonContainer = document.getElementById("pokemon-container")
	const searchBar = document.getElementById("pokemon-search-input")
  const pokeCard = document.getElementsByClassName('center-text')

	function fetchPoke(){
		fetch("http://localhost:3000/pokemon")
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			allPokemon = data

			showAllPokemon(data)
		})
	}
  function showAllPokemon(pokemon){
  		pokemon.forEach((pokemon) => {
  				pokemonContainer.innerHTML += `
  					<div data-id="${pokemon.id}"class="pokemon-container">
  					  <div style="width:230px;margin:10px;background:purple;color:cyan" class="pokemon-frame">
  					    <h1 class="center-text">${pokemon.name}</h1>
  					    <div style="width:239px;margin:auto">
  					      <div style="width:96px;margin:auto">
  					        <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
  					      </div>
  					    </div>
  					  </div>
  					</div>
  				`
  		})
  	}
    pokemonContainer.addEventListener('click', (event) => {
          if (event.target.dataset.action === 'flip'){
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

         searchBar.addEventListener("input", (e) => {

		const filteredPokemon = allPokemon.filter((pokemon) => {
			return pokemon.name.includes(e.target.value)
		})
		const filteredPokemonIDs = filteredPokemon.map(pokemon => pokemon.id)
		const cards = document.querySelectorAll(".pokemon-container")

		cards.forEach(card => {
			if (filteredPokemonIDs.includes(parseInt(card.dataset.id))){
				card.style.display = ""
			} else {
				card.style.display = "none"
			}
		})

		pokemonContainer.innerHTML = ""
		showAllPokemon(filteredPokemon)
	})

fetchPoke()
})
