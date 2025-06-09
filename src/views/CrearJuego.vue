<template>
  <div>
    <div class="formulario">
      <h2>Crea un nuevo juego</h2>
      <form @submit.prevent="crearJuego">
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="juego.nombre" required />
        </div>

        <div>
          <label for="puntos">Puntos:</label>
          <input type="number" id="puntos" v-model="juego.puntos" required />
        </div>

        <div>
          <label for="tiempo">Tiempo:</label>
          <input type="number" id="tiempo" v-model="juego.tiempo" required />
        </div>

        <button type="submit">Guardar juego</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrearJuego',
  emits: ['nuevo-juego'],
  data() {
    return {
      juego: {
        nombre: '',
        puntos: 0,
        tiempo: 0,
        completado: false
      }
    };
  },
  methods: {
    crearJuego() {
      this.$emit('nuevo-juego', { ...this.juego, id: Date.now() });
      this.juego = {
        nombre: '',
        puntos: 0,
        tiempo: 0,
        completado: false
      };
    }
  }
};
</script>
