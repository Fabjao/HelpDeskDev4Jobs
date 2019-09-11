<template>
  <v-app>
    <div v-show="mostrarMenu">
      <v-app-bar app>
        <v-toolbar-title class="headline">
          <router-link class="mr-4" to="/tutorial">Tutorial</router-link>
          <router-link to="/duvida">Duvidas</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
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
    }
  },
  methods: {
    sair() {
      localStorage.removeItem("dev4jobsForum");
      this.$router.push("/");
    }
  }
};
</script>
