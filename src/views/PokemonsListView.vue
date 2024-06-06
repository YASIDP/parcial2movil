<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <h3 class="text-primary">Listado de Pokemons</h3>
      </div>
    </div>
    <div class="row p-3 mt-3 mb-3  d-flex justify-content-center">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="col-sm-10 pok">
        <div @click="watchDetail(pokemon.name)" class="card  d-flex justify-content-center aligin-items-center pokc">
          <div class="card-title">
            <img :src="pokemon.image" alt="">
            <h4>
              {{pokemon.name}}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <button @click="previousPage" :disabled="currentPage === 1" class="btn btn-primary m-2">Volver</button>
        <button @click="nextPage" :disabled="currentPage * pageSize >= totalPokemons" class="btn btn-primary m-2">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices'

export default {
  name: 'PokemonsListView',
  data() {
    return {
      pokemons: [],
      selectedPokemon: {},
      currentPage: 1,
      pageSize: 10
    }
  },
  async created(){
   this.pokemons = await PokemonServices.getPokemons(1,10);
   console.log(this.pokemons)
  },
  methods: {
    async watchDetail(name) {
      this.selectedPokemon = await PokemonServices.getPokemonsDetail(name);
      this.$router.push({ name: 'detalle', params: { name: name } });
    },
    async previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchPokemons();
      }
    },
    async nextPage() {
      this.currentPage++;
      await this.fetchPokemons();
    },
    async fetchPokemons() {
      const start = (this.currentPage - 1) * this.pageSize + 1;
      const end = start + this.pageSize - 1;
      this.pokemons = await PokemonServices.getPokemons(start, end);
    }
  }
}
</script>

<style scoped>
img {
  max-height: 120px;
  margin-top: 4%
}
.pok{
margin: 2%;
background-color: rgb(228, 238, 247) ;
}
.pokc{
  background-color: rgb(245, 250, 255)
}
.container{
  background-color: rgb(204, 226, 245);
}
h3{
  margin-top: 15%;
  color: rgb(59, 8, 200);
  font-size: 25px;
  font-weight: bold;
}
button {
  margin-top: 1%;
  margin-bottom: 1%;
  background-color: rgb(217, 171, 255);
  color: black;
}
</style>
