import { createRouter, createWebHistory } from 'vue-router'
import PokemonsListView from '../views/PokemonsListView.vue'
import PokemonGameView from '../views/PokemonGameView.vue'
import PokemonsdetalleView from '../views/PokemonsdetalleView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component:PokemonsListView
  },
  {
    path: '/detalle/:name',
    name: 'detalle',
    component:PokemonsdetalleView
  },
  {
    path: '/game',
    name: 'game',
    component:PokemonGameView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
