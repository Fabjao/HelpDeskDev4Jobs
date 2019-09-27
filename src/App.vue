<template>
  <v-app>
    <div v-show="mostrarMenu">
      <v-app-bar app>
        <v-toolbar-title class="headline">
          <!-- <router-link class="mr-4" to="/tutorial">Tutorial</router-link>
          <router-link to="/duvida">Duvidas</router-link>-->
          Help Desk Dev4Jobs
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div :class="colorTipo">
          <span class="mr-4">{{tipoUsuario}}</span>
          <span class="mr-4">{{nomeUsuario}}</span>
        </div>

        <v-btn @click="sair">
          <span class="mr-2">Sair</span>
        </v-btn>
      </v-app-bar>
    </div>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
  computed: {
    mostrarMenu() {
      return this.$store.state.login.loginSuccessful;
    },
    nomeUsuario() {
      return this.$store.state.login.nome;
    },
    tipoUsuario() {
      console.log("this.$store.state.login.tipo", this.$store.state.login.tipo);

      return this.$store.state.login.tipo;
    },
    colorTipo() {
      return this.$store.state.login.tipo == "ATENDENTE"
        ? "primary"
        : "warning";
    }
  },
  methods: {
    sair() {
      localStorage.removeItem("dev4jobsForum");
      this.$router.push("/login");
    }
  }
};
</script>
