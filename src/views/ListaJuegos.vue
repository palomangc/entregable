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
        {{ juego.completado ? 'Marcar como no completado' : 'Marcar como completado' }}</button>
      <div class="game-actions">
      <button @click="editarJuego(juego.id)" class="edit-button">Editar</button>
    </div>
    </div>
    </div>
  </div>
  </template>

<script>
import EditarJuego from './EditarJuego.vue';

export default {
  name: 'ListaJuegos',
  props: ['juegos'],
  methods: {
    toggleMarcarCompletado(juego) {
      juego.completado = !juego.completado;
    },
    editarJuego(id) {
    this.$router.push({ name: 'editarJuego', params: { id: id }});
    }
  }
};
</script>