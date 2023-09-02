<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.calcVH(); // Llamar a la función al crear el componente
    window.addEventListener("resize", this.calcVH); // Escuchar cambios de tamaño de ventana
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calcVH); // Eliminar el listener antes de destruir el componente
  },
  methods: {
    calcVH() {
      const vH = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      document
        .getElementById("app")
        .setAttribute("style", `min-height: ${vH}px;`);
    },
  },
};
</script>

<style lang="scss">
:root {
  --shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
    inset 0 -15px 15px rgba(255, 255, 255, 0.05),
    0 15px 15px rgba(0, 0, 0, 0.05), inset 0 15px 15px rgba(0, 0, 0, 0.05);
}
/* Default styles reset */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  -webkit-tap-highlight-color: transparent;
  font-family: DM SANS, sans-serif;
}
#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #373e60;
}
</style>
