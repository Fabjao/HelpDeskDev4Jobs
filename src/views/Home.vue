<template>
  <div>
    <v-container>
      <h1>Tutorial</h1>
      <span>{{nome}}</span>
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
  computed: {
    nomeUsuario() {
      return this.$store.state.cadastro.nome;
    }
  }
};
</script>
