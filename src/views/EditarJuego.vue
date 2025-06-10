<template>
  <div class="editar-juego">
    <h2>Editar juego: {{ juegoLocal.nombre }}</h2>
    <form @submit.prevent="actualizarJuego">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text"id="nombre" v-model="juegoLocal.nombre" required>
      </div>

      <div class="form-group">
        <label for="puntos">Puntos:</label>
        <input type="number"id="puntos" v-model.number="juegoLocal.puntos" required>
    </div>

    <div class="form-group">
      <label for="tiempo">Tiempo:</label>
      <input type="number" id="tiempo" v-model.number="juegoLocal.tiempo" required>
    </div>

    <div class="form-group checkbox-group">
      <label for="completado">Completado:</label>
      <input type="checkbox" id="completado" v-model="juegoLocal.completado">
    </div>

    <div class="guardar-cambios">
      <button type="submit" class="save-buttton">Guardar cambios</button>
      <button type="button" @click="cancelar" class="cancel-button">Cancelar</button>
    </div>
  </form>
  </div>

</template>

<script>
export default {
  name: 'Editar juego',
  props: {
    juegos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      juegoLocal: null
    };
  },
  created() {
    const gameId = parseInt(this.$route.params.id);
    const juegoEncontrado = this.juegos.find(j => j.id === gameId);

    if (juegoEncontrado) {
      this.juegoLocal = { ...juegoEncontrado };
      } else {
        alert("Juego no encontrado");
        this.$router.push('/juegos')
      }
    },
    methods: {
      actualizarJuego () {
        this.$emit('actualizar-juego', this.juegoLocal);
        alert("Juego editado con éxito.");
        this.$router.push('/juegos')
      },
      cancelar() {
        this.$router.push('/juegos');
      }
    }
  };
</script>
