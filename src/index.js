document.addEventListener('DOMContentLoaded', () => {

  const pokemonContainer = document.getElementById('pokemon-container')
  const searchInput = document.getElementById('pokemon-search-input')
  let clicked = false

  POKEMON.forEach((pokemon) => {
    pokemonContainer.innerHTML +=
    `<div class="pokemon-container">
      <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
           </div>
         </div>
       </div>
     </div>`
  })

  searchInput.addEventListener('input', (event) => {
    const filteredPokemon = POKEMON.filter((pokemon) => pokemon.name.includes(event.target.value))

    pokemonContainer.innerHTML = ''

    filteredPokemon.forEach((pokemon) => {
      pokemonContainer.innerHTML +=
      `<div class="pokemon-container">
        <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${pokemon.name}</h1>
            <div style="width:239px;margin:auto">
              <div style="width:96px;margin:auto">
                <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
             </div>
           </div>
         </div>
       </div>`
    })

  })

  pokemonContainer.addEventListener('click', (event) => {
    if (event.target.dataset.action === "flip") {
      clicked = !clicked
      let foundPokemon = POKEMON.find( (pokemon) => pokemon.id == event.target.dataset.id )
      clicked ? event.target.src = foundPokemon.sprites.back : event.target.src = foundPokemon.sprites.front
    }
  })

})

//   const pokemonContainer = document.getElementById('pokemon-container')
//
//   function fetchPokemon() {
//     fetch("http://localhost:3000/pokemon")
//       .then((response) => response.json())
//       .then((data) => {
//         let allPokemon = data
//         showAllPokemon(data)
//       })
//     }
//
//   function showAllPokemon(pokemon) {
//     pokemon.forEach((pokemon) => {
//       pokemonContainer.innerHTML +=
//       `<div class="pokemon-container">
//         <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
//           <h1 class="center-text">${pokemon.name}</h1>
//             <div style="width:239px;margin:auto">
//               <div style="width:96px;margin:auto">
//                 <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
//              </div>
//            </div>
//          </div>
//        </div>`
//     })
//
//   }
//
//   fetchPokemon()
//
//   // THEN YOU CAN REPLACE THE POKEMON ARRAY WITH THE ALL POKEMON VARIABLE
//
// })
