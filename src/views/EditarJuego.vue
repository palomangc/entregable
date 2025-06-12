<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const emit = defineEmits(['actualizar-juego'])

const juegoLocal = ref(null)

const form = ref({
  nombre: '',
  puntos: 0,
  tiempo: 0,
  completado: false
})

const route = useRoute()
const router = useRouter()

onMounted (async () => {
  const gameId = route.params.id
  const { data: juegoEncontrado, error } = await supabase
    .from('juegos')
    .select('*')
    .eq('id', gameId)
    .single()

  if (error || !juegoEncontrado) {
    alert('Juego no encontrado')
    router.push('/juegos')
  } else {
    juegoLocal.value = { ...juegoEncontrado}

    form.value.nombre = juegoLocal.value.nombre
    form.value.puntos = juegoLocal.value.puntos
    form.value.tiempo = juegoLocal.value.tiempo
    form.value.completado = Boolean(juegoLocal.value.completado)
  }
})

async function actualizarJuego() {
  const { error } = await supabase
  .from ('juegos')
  .update({
    nombre: form.value.nombre,
    puntos: form.value.puntos,
    tiempo: form.value.tiempo,
    completado: form.value.completado
  })
  .eq('id', juegoLocal.value.id)

  if (error) {
    alert('Error al actualizar el juego: ' + error.message)
    return
  }
  alert ('Juego actualizado correctamente')
  juegoLocal.value = {
    ...juegoLocal.value,
    nombre: form.value.nombre,
    puntos: form.value.puntos,
    tiempo: form.value.tiempo,
    completado: form.value.completado
  }
  router.push('/juegos')
  }
    function cancelar() {
    router.push('/juegos')
    }
</script>

<template>
  <div class="editar-juego" v-if="juegoLocal">
    <h2>Editar juego: {{ juegoLocal.nombre }}</h2>
    <form @submit.prevent="actualizarJuego">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="form.nombre" required minlength="3" maxlength="250"/>
      </div>

      <div class="form-group">
        <label for="puntos">Puntos:</label>
        <input type="number" id="puntos" v-model.number="form.puntos" required min="0" max="1000" />
      </div>

      <div class="form-group">
        <label for="tiempo">Tiempo:</label>
        <input type="number" id="tiempo" v-model.number="form.tiempo" required min="0" max="1000"/>
      </div>

      <div class="form-group" style="display: flex; align-items: center; gap: 2.5rem;">
        <label for="completado" style="margin: 0;">Completado:</label>
        <input type="checkbox" id="completado" v-model="form.completado" />
        <span style="font-weight: bold;">{{ form.completado ? 'Sí' : 'No' }}</span>
      </div>
      <div class="guardar-cambios">
        <button type="submit" class="save-button">Guardar cambios</button>
        <button type="button" @click="cancelar" class="cancel-button">Cancelar</button>
      </div>
    </form>
  </div>
</template>
