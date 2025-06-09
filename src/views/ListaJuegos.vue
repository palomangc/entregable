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
      <button @click="marcarCompletado(juego)">Marcar como completado</button>
    </div>
    </div>
  </div>
  </template>

<script>
export default {
  name: 'ListaJuegos',
  props: ['juegos'],
  methods: {
    marcarCompletado(juego) {
      juego.completado = true;
    }
  }
};
</script>