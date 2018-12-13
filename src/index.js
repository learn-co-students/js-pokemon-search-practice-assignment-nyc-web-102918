document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  //YOUR CODE HERE
  const container = document.querySelector('#pokemon-container')
  const search = document.querySelector("#pokemon-search-input")

  function pokeRender(e) {
    container.innerHTML += `
    <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
      <h1 class="center-text">${e.name}</h1>
      <div style="width:239px;margin:auto">
        <div style="width:96px;margin:auto">
          <img data-id="${e.id}" data-action="flip" class="toggle-sprite" src="${e.sprites.front}">
          <button data-id="${e.id}" data-action="info">Info</button>
        </div>
      </div>
    </div>
    `
  }

  POKEMON.forEach(pokeRender)

  search.addEventListener('input', function(e) {
    e.preventDefault()
    const input = e.target.value
    container.innerHTML = ''
    const filteredPoke = POKEMON.filter(function(e) {
      return e.name.includes(input)
    })
    filteredPoke.forEach(pokeRender)
  })

  let click = false
  
  container.addEventListener('click', function(e) {
    if (e.target.dataset.action === 'flip') {
      const poke = POKEMON.find(function(element) {
        return element.id == e.target.dataset.id
      })

      if (e.target.src === poke.sprites.front) {
        e.target.src = poke.sprites.back
      } else {
        e.target.src = poke.sprites.front
      }
    }


    if (e.target.dataset.action === 'info') {
      const poke = POKEMON.find(function(element) {
        return element.id == e.target.dataset.id
      })

      if (click) {
        container.querySelector('#poke-div-' + poke.id).remove()
      } else {
        const parentDiv = document.createElement('div')
        parentDiv.innerHTML = `
        <p> Types: ${poke.types}, Height: ${poke.height}, Weight: ${poke.weight} </p>
        `

        parentDiv.id = 'poke-div-' + poke.id

        e.target.parentNode.appendChild(parentDiv)
      }
      click = !click
    }
  })

})
