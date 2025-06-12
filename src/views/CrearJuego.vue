<script setup>
import { reactive } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import ListaJuegos from './ListaJuegos.vue'

const emit = defineEmits(['nuevo-juego'])
const router = useRouter()

const juego = reactive({
  nombre: '',
  puntos: 0,
  tiempo: 0,
  completado: false
})

const crearJuego = async () => {
  const {data, error} = await supabase
  .from ('juegos')
  .insert ([{
    nombre: juego.nombre,
    puntos: juego.puntos,
    tiempo: juego.tiempo,
    completado: juego.completado
  }])
  if (error) {
    console.info ("No se ha podido crear el juego en Supabase", error.message)
    alert('Hubo un error al guardar el juego')
    return
  }

  emit ('nuevo-juego', data)
  alert ('Juego creado con éxito')
  //Limpiar campos
  juego.nombre = ''
  juego.puntos = 0
  juego.tiempo = 0
  juego.completado = false
  router.push('/juegos')
}

</script>

<template>
  <div>
    <div class="formulario">
      <h2>Crea un nuevo juego</h2>
      <form @submit.prevent="crearJuego">
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="juego.nombre" required minlength="3" maxlength="250" />
        </div>

        <div>
          <label for="puntos">Puntos:</label>
          <input type="number" id="puntos" v-model="juego.puntos" required min="0" max="1000" />
        </div>

        <div>
          <label for="tiempo">Tiempo:</label>
          <input type="number" id="tiempo" v-model="juego.tiempo" required min="1" max="500"/>
        </div>

        <button type="submit">Guardar juego</button>
      </form>
    </div>
  </div>
</template>
