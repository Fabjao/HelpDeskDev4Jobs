<template>
  <div>
    <v-container>
      <h1></h1>
      <span></span>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      nome: ""
    };
  },
  created() {
    const usuario = JSON.parse(localStorage.getItem("dev4jobsForum")).tipo;
    if (usuario == "CLIENTE") this.$router.push("/cliente");
    else this.$router.push("/atendente");
  }
};
</script>
