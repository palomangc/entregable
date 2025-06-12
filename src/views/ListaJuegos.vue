<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { supabase } from '../lib/supabase'

const juegos = ref([])
const router = useRouter()

const filtroNombre = ref('')
const filtroCompletado = ref (false)
const ordenPuntuacion = ref ('desc') //ascendente (asc) o descendente (desc)

async function cargarJuegos() {
  const { data, error } = await supabase
  .from('juegos')
  .select('id, nombre, puntos, tiempo, completado, creado_el')

  if (!error) juegos.value = data
}

onMounted(() => {
  cargarJuegos()
})

watch([filtroNombre, filtroCompletado, ordenPuntuacion], () => {

})

async function toggleMarcarCompletado(juego) {
  const nuevoEstado = !juego.completado

  const { error } = await supabase
  .from ('juegos')
  .update({ completado: nuevoEstado})
  .eq('id', juego.id)

  if (error) {
    alert('Error al actualizar el estado del juego: ' + error.message)
    return
  }
  juego.completado = nuevoEstado

  alert('Estado actualizado correctamente')
}

function editarJuego(id) {
  router.push({ name: 'editarJuego', params: { id } })
}

onMounted ( async () => {
  const {data, error}= await supabase
    .from('juegos')
    .select('id, nombre, puntos, tiempo, completado, creado_el')
    .order('completado', { ascending: true});
    juegos.value = data
})

//Eliminar juegos
async function borrarJuego(id) {
  const { error } = await supabase
  .from('juegos')
  .delete()
  .eq('id', id)

  if (error){
    console.error('Error al borrar el juego:', error)
    alert('Hubo un error al eliminar el juego')
  } else {
    //Actualizar la lista de juegos tras borrar
    juegos.value = juegos.value.filter(j => j.id !== id)
  }

  if (confirm('¿Estás seguro de que quieres eliminar este juego?')){

  }
}


const juegosFiltradosOrdenados = computed (() => {
  let lista = juegos.value

  //Filtrar por nombre
  if (filtroNombre.value.trim() !== '') {
    const busqueda = filtroNombre.value.trim().toLowerCase()
    lista = lista.filter(j => j.nombre.toLowerCase().includes(busqueda))
  }
  //Filtrar por completado
  if (filtroCompletado.value) {
    lista = lista.filter(j => j.completado === true)
  }
  
//Ordenar por puntuación (puntos/tiempo)
lista = lista.slice().sort((a, b) => {
  const puntuacionA = a.tiempo ? a.puntos / a.tiempo : 0
  const puntuacionB = b.tiempo ? b.puntos / b.tiempo : 0

  if (ordenPuntuacion.value === 'asc') {
    return puntuacionA - puntuacionB
  } else {
    return puntuacionB - puntuacionA
  }
})

//Completados al final
lista.sort((a, b) => a.completado - b.completado)

return lista
})

</script>

<template>
  <div>
    <h2>Lista de juegos</h2>

    <div class="filtros">
      <label>Buscar nombre:
      <input type="text" v-model="filtroNombre" placeholder="Filtrar por nombre"/>
      </label>

      <label>
        Ordenar por puntuación:
        <select v-model="ordenPuntuacion">
          <option value="desc">Descendente</option>
          <option value="asc">Ascendente</option>
        </select>
      </label>
    </div>
    <div class="contenedor-tarjetas">
      <div v-for="juego in juegosFiltradosOrdenados" :key="juego.id" class="tarjeta">
        <h2 :class="{ completado: juego.completado }">{{ juego.nombre }}</h2>

        <p>Puntos: {{ juego.puntos }}</p>
        <p>Tiempo: {{ juego.tiempo }}</p>
        <p>Completado: {{ juego.completado ? 'Sí' : 'No' }}</p>
        <p>Puntuación: {{ (juego.puntos / juego.tiempo).toFixed(2) }}</p>    
        <button @click="toggleMarcarCompletado(juego)">
          {{ juego.completado ? 'Marcar como no completado' : 'Marcar como completado' }}
        </button>
        <div class="game-actions">
          <button @click="editarJuego(juego.id)" class="edit-button">Editar</button>
          <button @click="borrarJuego(juego.id)" class="delete-button">Borrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
