document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  //YOUR CODE HERE
  const pokemonContainer= document.getElementById('pokemon-container') //necesito guardar esto porque es donde voy anadir mis fotos de pokemon
  const searchPokemon=document.getElementById('pokemon-search-input') //necesito guardar el nombre de la caja donde puedo escribir para buscar algo
  let allPokemonData=[] // en este array voy a guardar mi data que tengo en mi parsedPokeJson

    function fetchPokemon(){
      fetch('http://localhost:3000/pokemon', {method: 'GET'}) // en este caso no hace falta agregar GET, porque GET lo hace por default
        .then(function(responseObject) { //en esta linea la funcion recibe la respuesta de fetch
          //console.log(responseObject)
          return responseObject.json() //se la paso a json porque necesito acomodar esa data de una manera readble
        })
        .then(function(parsedPokeJson) { //recibe lo que retorno el previo .then
          allPokemonData = parsedPokeJson //guardo mi data acomodada en un array que luego utilizare mas tarde
          //console.table(parsedPokeJson)
          //console.log(allPokemonData)
          // aqui es donde puedo llamar otra funcion para recorrer mi vector, y de esa manera puedo reutilizar ese codigo
          // debo recorrer mi vector porque necesito mostrar todo en el browser.
          // le paso mi data acomodada a esa funcion que se encuentra solo afuera de fetch
          showAllPokemon(parsedPokeJson)

        })
    }

    function showAllPokemon(pokemonObject){
      pokemonObject.forEach(function(pokemonObject) {
        //console.log(pokemonObject)
        //utilizo el codigo html que me proporcionaron para poder mostrar los pokemon en el browser, y utilizo interpolacion
        //para que cada elemento del array lo pueda imprimir en la pantalla
        //utlizo mi cotainer que es donde voy insertar todo en el broser para eso utilizo inner HTML
        // que se encarga de escribir inside del html y uso += porque deseo seguir anadiendo cosas nuevas
        // no solo uno que en ese caso seria =
        pokemonContainer.innerHTML += `<div class="pokemon-container">
          <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
            <h1 class="center-text">${pokemonObject.name}</h1>
            <div style="width:239px;margin:auto">
              <div style="width:96px;margin:auto">
              <img data-id=${pokemonObject.id} data-action="flip" class="toggle-sprite" src=${pokemonObject.sprites.front}>
              </div>
            </div>
          </div>
        </div> `

      })
    }



    //estoy anadiendo un evento al container porq es la manera que tengo para poder interactuar con else {
    // usuario para saber cuando esta encima de la foto y poderla girar
    pokemonContainer.addEventListener("click", (e) => {
        //e porque es el nombre del evento y target porque se refiere a lo que el evento esta buscando
        //y tag name para encontrar especificamente la imagen se refiere al nombre de ese campo en el html
        // en el object si uso inspect y me paro en frente de la imagen vere img
    		if (e.target.tagName === "IMG") {
          //encuentro primero el pokemo donde el usuerio esta dando click para eso utilizo el id
    			const foundPokemon = allPokemonData.find(pokemon => {
            //digo es este pokemon con su id igual al evento con su target y id si es asi lo guardo en una variable
    				return pokemon.id === parseInt(e.target.dataset.id)
    			})
          // despues que lo tengo reassigno la foto dependiente si es la del frente o la de atras para
          //eso utilizo el atributo src.
    			if (e.target.src === foundPokemon.sprites.front) {
    				e.target.src = foundPokemon.sprites.back
    			} else {
    				e.target.src = foundPokemon.sprites.front
    			}
    		}
    	})


    searchPokemon.addEventListener('input', function(event) {
      // aqui basicamente lo que estoy haciendo es guardando en una variabale
      // lo que el usuario esta escribiendo en la cajita de buscar
      const userSearch=event.target.value
      //console.log(userSearch)
      const filteredPokemon = allPokemonData.filter(function(pokemonObject) {
      return pokemonObject.name.includes(userSearch)
      })
      // borro todo lo de la pantalla en el container para luego solo mostrar lo que encontre
      pokemonContainer.innerHTML = ''
      //reutilizo mi funcion para mostrar un pokemon
      showAllPokemon(filteredPokemon)
    })


      fetchPokemon() //llamo o invoco a mi funcion para que se pueda ejecutar


})



\
