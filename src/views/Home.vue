<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const juegos = ref([])

const total = ref(0)
const completados = ref (0)
const pendientes = ref (0)

onMounted(async () => {
  const { data, error } = await supabase
  .from ('juegos')
  .select('completado')

  if (error) {
    console.error('Error al cargar juegos:', error.message)
    return
  }

  juegos.value = data
  total.value = data.length
  completados.value = data.filter(j => j.completado).length
  pendientes.value = total.value - completados.value
})
</script>

<template>
  <div class="home">
  <p>Gestiona tus juegos pendientes de forma rápida y organizada.</p>
   <div class="estadisticas">
      <h2>📊Estadísticas</h2>
      <ul>
        <li>Total de juegos: <strong>{{ total }}</strong></li>
        <li>Completado: <strong>{{ ((completados / total) * 100).toFixed(2) }}%</strong></li>
        <li>Pendiente: <strong>{{ ((pendientes / total) *100).toFixed(2) }}%</strong></li>
      </ul>
    </div>
  <div class="botones">
    <router-link to="/juegos" class="btn">📋 Ver lista</router-link>
    <router-link to="/crear" class="btn">➕ Añadir juego</router-link>
  </div>
</div>

</template>
