import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListaJuegos from '../views/ListaJuegos.vue'
import CrearJuego from '../views/CrearJuego.vue'
import EditarJuego from '../views/EditarJuego.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/juegos', name: 'ListaJuegos', component: ListaJuegos },
  { path: '/crear', name: 'CrearJuego', component: CrearJuego },
  { path: '/editar/:id', name: 'editarJuego', component: EditarJuego, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
