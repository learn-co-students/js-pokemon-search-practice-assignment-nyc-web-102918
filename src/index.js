document.addEventListener('DOMContentLoaded', () => {
// THINGS THAT MUST BE UPDATED FOR EACH UPDATE: HTML DATABASE AND LOCAL ARRAY
  //variables
  let allPokemon = []
  const container = document.querySelector("#pokemon-container")
  const searchBar = document.querySelector("#pokemon-search-input")
  const newPokemonForm = document.querySelector("#new-pokemon-form")
  const editPokemonForm = document.querySelector("#edit-pokemon-form")

  //function simply for fetching and getting pokemon data
    function fetchPokemon(){
      fetch('http://localhost:3000/pokemon')
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        allPokemon = data
        showAllPokemon(data) //*calling the function below passing in the data
      })
    }

  //function for showing the fetched data on the page
    function showAllPokemon(pokemon){

      container.innerHTML = pokemon.map(renderSinglePokemon).join('')

      pokemon.forEach(function(pokemon){
        container.innerHTML += renderSinglePokemon(pokemon)
      })
    }

    container.addEventListener('click', function(event){
      // could use id's, tagName, dataid, etc, in this case we are checking if it is an image
      if (event.target.tagName === 'IMG'){
        const foundPokemon = allPokemon.find(pokemon =>{
          return pokemon.id === parseInt(event.target.dataset.id)
        })
        if (event.target.src === foundPokemon.sprites.front){
        event.target.src = foundPokemon.sprites.back}
        else {
          event.target.src = foundPokemon.sprites.front
        }
      }
      else if (event.target.dataset.action === 'delete'){
        fetch(`http://localhost:3000/pokemon/${event.target.dataset.id}`, {method:'DELETE'}) //removes pokemon from db
        document.querySelector(`#pokemon-${event.target.dataset.id}`).remove()
        allPokemon = allPokemon.filter(function(pokemon){
          return pokemon.id !== parseInt(event.target.dataset.id)
          console.log(allPokemon)
        })
      }
      else if (event.target.dataset.action === "edit") {
  			editPokemonForm.dataset.id = event.target.dataset.id //assign the pokemon form a data-id that matches the id of the pokemon the user wishes to edit
  			const editPokeInput = document.querySelector("#edit-poke-name")
  			const editPokeFrontSprite = document.querySelector("#edit-poke-front-sprite")
  			const editPokeBackSprite = document.querySelector("#edit-poke-back-sprite")

  			document.body.className = 'is-blurred'
  			document.querySelector('#overlay').style.visibility = 'visible'
  			const foundPokemon = allPokemon.find(pokemon => {
  				return pokemon.id === parseInt(event.target.dataset.id)
  			})
  			editPokeInput.value = foundPokemon.name
  			editPokeFrontSprite.value = foundPokemon.sprites.front
  			editPokeBackSprite.value = foundPokemon.sprites.back
  		}
    })

    searchBar.addEventListener('input', function(event){
      const filteredPokemon = allPokemon.filter(function(pokemon){
        return pokemon.name.includes(event.target.value)
      })
      //option 1 -( not as efficient if there were thousands and thousands of items)
      container.innerHTML = ''

      //**option 2 - without showAllPokemon(filterPokemon) below**
      // const filteredPokemonIDs = filteredPokemon.map(pokemon => pokemon.id)
      //
      // const cards = document.querySelectorAll('.pokemon-container')
      //
      // cards.forEach(card => {
      //   if(filteredPokemonIDs.includes(parseInt(card.dataset.id))){
      //     card.style.display = ''
      //   } else {
      //     card.style.display = 'none'
      //   }
      // })
      showAllPokemon(filteredPokemon)
    })

    newPokemonForm.addEventListener("submit", (e) => {
		e.preventDefault() //stop form from POSTing
		const newPokeName = e.target.querySelector("#new-poke-name").value
		const newPokeFrontImg = e.target.querySelector("#new-poke-front-sprite").value
		const newPokeBackImg = e.target.querySelector("#new-poke-back-sprite").value

		fetch("http://localhost:3000/pokemon", {
			method: "POST",
			headers: {
				"Content-Type": "application/json", //type of data being sent
				"Accept": "application/json" //type of data I (the client) want back
			},
			body: JSON.stringify({
				name: newPokeName,
				sprites: {
					front: newPokeFrontImg,
					back: newPokeBackImg
				}
			})
		})
		.then(/*function*/r => /*return*/ r.json())
		.then(newPoke => {
			allPokemon.push(newPoke)
			container.innerHTML += renderSinglePokemon(newPoke)
		})


	})

  editPokemonForm.addEventListener("submit", (e) => {
		e.preventDefault()
		const editPokeName = e.target.querySelector("#edit-poke-name").value
		const editPokeFrontImg = e.target.querySelector("#edit-poke-front-sprite").value
		const editPokeBackImg = e.target.querySelector("#edit-poke-back-sprite").value
		fetch(`http://localhost:3000/pokemon/${e.target.dataset.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json", //type of data being sent
				"Accept": "application/json" //type of data I (the client) want back
			},
			body: JSON.stringify({
				name: editPokeName,
				sprites: {
					front: editPokeFrontImg,
					back: editPokeBackImg
				}
			})
		})
		.then(r => r.json())
		.then(editedPoke => {
			// find the idx pos of the edited pokemon so we can update in the allPokemon array
			const editedPokeIdx = allPokemon.findIndex(p => p.id === editedPoke.id)
			allPokemon[editedPokeIdx] = editedPoke
			showAllPokemon(allPokemon)
			document.body.className = ""
			document.querySelector('#overlay').style.visibility = "hidden"
		})
	})



    function renderSinglePokemon(pokemon){
      return `
      <div id="pokemon-${pokemon.id}" data-id="${pokemon.id}"class="pokemon-container">
      <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
            <img data-id="${pokemon.id}" data-beef="stroganoff" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
            <button data-id="${pokemon.id}" data-action="edit">Edit</button>
            <button data-id="${pokemon.id}" data-action="delete">X</button>
          </div>
        </div>
      </div>
    </div>`
    }


  fetchPokemon()


})//END OF DOMCONTENDLOADED
