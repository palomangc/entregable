<template>
  <div>
    <div class="home">
      <img src="./assets/logo.png" />
      <h1>Pasapantallas</h1>
      <p>Tu app para gestionar los juegos pendientes</p>
    </div>

    <nav class="menu">
      <router-link to="/">Inicio</router-link>
      <router-link to="/juegos">Lista de juegos</router-link>
      <router-link to="/crear">Crear juego</router-link>
    </nav>
    <router-view />
   
  </div>
</template>