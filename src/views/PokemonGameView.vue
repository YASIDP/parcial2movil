<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <h3 class="titulo">¿QUIÉN ES ESTE POKÉMON?</h3>
      </div>
    </div>
    <div class="row">
      <div v-if="pokemonToGuess" class="col d-flex justify-content-center">
        <!-- Agrega una condición para verificar si pokemonToGuess no es null -->
        <img v-if="!answered" :src="pokemonToGuess.image" :alt="pokemonToGuess.name" class="pokemon-image">
        <img v-else :src="pokemonToGuess.image" :alt="pokemonToGuess.name" class="img">
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-column justify-content-center align-items-center">
        <button v-for="option in options" :key="option.id" @click="checkAnswer(option)" :disabled="answered">
          {{ option.name }}
        </button>
      </div>
    </div>
    <div class="row sector">
      <div class="col d-flex justify-content-center">
        <p v-if="answered">¡{{ answerMessage }}!</p>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <button @click="restart" v-if="answered">Volver a intentar</button>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices'

export default {
  name: 'PokemonGameView',
  data() {
    return {
      pokemons: [],
      pokemonToGuess: null,
      options: [],
      correctAnswer: null,
      answered: false,
      answerMessage: ''
    }
  },
  async created() {
    await this.selectRandomPokemon()
  },
  methods: {
    async selectRandomPokemon() {
      this.pokemons = await PokemonServices.getPokemonsForGame()
      this.pokemonToGuess = this.pokemons[Math.floor(Math.random() * this.pokemons.length)]
      this.options = this.pokemons.filter(pokemon => pokemon.id !== this.pokemonToGuess.id)
      this.options = this.shuffle(this.options).slice(0, 4)
      this.options.push(this.pokemonToGuess)
      this.options = this.shuffle(this.options)
      this.correctAnswer = this.options.findIndex(pokemon => pokemon.id === this.pokemonToGuess.id)
    },
    async checkAnswer(selectedPokemon) {
      if (selectedPokemon.id === this.pokemonToGuess.id) {
        this.answerMessage = '¡Correcto!'
      } else {
        this.answerMessage = '¡Incorrecto! Inténtalo de nuevo.'
      }
      this.answered = true
    },
    async restart() {
      // Reset the game
      this.answered = false
      this.answerMessage = ''
      await this.selectRandomPokemon()
    },
    shuffle(array) {
      // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 1%;
  margin-bottom: 1%;
  background-color: rgb(217, 171, 255);
  color: black;
  width: 250px;
}
img{
  max-height: 200px;
  margin-bottom: 4%;
  margin-top: 2%;
}
.pokemon-image {
  max-height: 200px;
  filter:brightness(0);
  margin-bottom: 4%;
  margin-top: 2%;
}
.titulo {
  color: rgb(59, 8, 200);
  font-size: 25px;
  font-weight: bold;
}
.sector{
  margin-top: 5%;
}
.container{
  background-color: rgb(204, 226, 245);
}
</style>
