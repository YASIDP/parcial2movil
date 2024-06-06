<template>
  <div class="container" >
    <h1>Detalles del Pokémon</h1>
    <div v-if="selectedPokemon">
      <img :src="selectedPokemon.image" alt="Imagen del Pokémon">
      <h2>{{ selectedPokemon.name }}</h2>
      <p>Altura: {{ selectedPokemon.height }}</p>
      <p>Peso: {{ selectedPokemon.weight }}</p>
      <p>Tipo(s): {{ selectedPokemon.types.map(type => type.type.name).join(', ') }}</p>
      <h3>Habilidades:</h3>
      <p v-for="ability in selectedPokemon.abilities" :key="ability.ability.name">{{ ability.ability.name }}</p>
   
      <!-- Agrega más detalles según sea necesario -->
      <button @click="goBack">Volver</button>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices'

export default {
  name: 'PokemonsdetalleView',
  data() {
    return {
      selectedPokemon: null
    }
  },
  async created() {
    const pokemonName = this.$route.params.name;
    this.selectedPokemon = await PokemonServices.getPokemonsDetail(pokemonName);
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Volver atrás en la historia del navegador
    }
  }
}
</script>

<style>
img{
  max-height: 200px;
  margin-top: 5%;
  margin-bottom: 7%;
}
h1{
  color: rgb(59, 8, 200);
  font-size: 25px;
  font-weight: bold;
}
h2{
  color: rgb(59, 8, 200);
  font-size: 25px;
  font-weight: bold;
}
.container{
  background-color: rgb(204, 226, 245);
}
h3{
  color: rgb(59, 8, 200);
  font-size: 25px;
  font-weight: bold;
}
button {
  margin-top: 1%;
  margin-bottom: 1%;
  background-color: rgb(217, 171, 255);
  color: black;
  width: 250px;
}
</style>
