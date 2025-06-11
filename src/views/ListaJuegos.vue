<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabase'

const juegos = ref([])

const router = useRouter()

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

</script>

<template>
  <div>
    <h2>Lista de juegos</h2>
    <div class="contenedor-tarjetas">
      <div v-for="juego in juegos" :key="juego.id" class="tarjeta">
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
        </div>
      </div>
    </div>
  </div>
</template>
