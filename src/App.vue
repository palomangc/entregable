<template>
  <div>
    <div class="home">
        <img src="./assets/logo.png">
        <h1> Pasapantallas </h1>
        <p>Tu app para gestionar los juegos pendientes</p>
       </div>
      
     <nav class="menu">
      <router-link to="/">Inicio</router-link>
      <router-link to="/juegos">Lista de juegos</router-link>
      <router-link to="/crear">Crear juego</router-link>
      <router-link to="/editar/id:">Editar juego</router-link>
    </nav>

    <router-view v-slot="{ Component }">
      <component 
        :is="Component" 
        :juegos="juegos" 
        @nuevo-juego="agregarJuego"
      />
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      juegos: [
        { id: 1, nombre: "Tetris", puntos: 60, tiempo: 5, completado: false },
        { id: 2, nombre: "Buscaminas", puntos: 85, tiempo: 7, completado: true },
        { id: 3, nombre: "Ajedrez", puntos: 40, tiempo: 4, completado: true },
        { id: 4, nombre: "Solitario", puntos: 100, tiempo: 2, completado: false },
        { id: 5, nombre: "Parchís", puntos: 150, tiempo: 3, completado: false }
      ]
    };
  },
methods: {
    agregarJuego(juegoNuevo) {
      this.juegos.push(juegoNuevo);
    }
   }
  };

</script>

