import axios from 'axios'

async function idsForGame() {
    let list =[];
    for(let i = 0; i <=3; i++){
        list[i] = Math.floor(Math.random()* 649)+1
    }
    return list
}

export default {
    async getPokemons(start, end){
        let gottenPokemons = []
        for(let i = start; i<= end; i ++){
            const itemPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
            })
            const addedPokemon = {
                id:itemPokemon.id,
                name:itemPokemon.name,
                image: itemPokemon.sprites.other.dream_world.front_default
            }
            gottenPokemons.push(addedPokemon)
        }
        return gottenPokemons;
    },
    async getPokemonsForGame(){
        const list = await idsForGame()
        
        let gottenPokemons = []
        for(let i = 0; i< list.length; i++){
            console.log('xxxx',i)
            const itemPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${list[i]}`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
            })
            const addedPokemon = {
                id:itemPokemon.id,
                name:itemPokemon.name,
                image: itemPokemon.sprites.other.dream_world.front_default
            }
            console.log('xxxx',addedPokemon)
            gottenPokemons.push(addedPokemon)
        }
        return gottenPokemons;
    },
  
    async getPokemonsDetail(id) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemonData = response.data
        const imageUrl = pokemonData.sprites.other.dream_world.front_default
        return { ...pokemonData, image: imageUrl }
    }

}
