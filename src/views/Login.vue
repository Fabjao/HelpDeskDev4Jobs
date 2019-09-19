<template>
  <div class="login">
    <div v-if="loggingIn" class="container-loading">
      <img src="@/assets/loading.gif" alt="Loading Icon" />
    </div>
    <form @submit.prevent="loginSubmit">
      <v-text-field v-model="email" label="E-mail"></v-text-field>
      <v-text-field
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="Senha"
        class="input-group--focused"
        v-model="senha"
      ></v-text-field>
      <button type="submit">Login</button>
      <router-link to="/cadastro">
        <a>Registre</a>
      </router-link>
    </form>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import store from "@/_store/store.js";
export default {
  data() {
    return {
      show3: false,
      email: "fabioatendente@email.com",
      senha: "aa123456"
    };
  },
  created: function() {
    if (store.state.login.loginSuccessful) this.$router.push("/home");

    const mail = this.$store.state.cadastro.nome;
    if (mail != "") this.email = mail;
  },
  computed: {
    ...mapState("login", ["loggingIn", "loginError", "loginSuccessful"])
  },
  methods: {
    ...mapActions("login", ["doLogin"]),
    async loginSubmit() {
      if (this.email === "" && this.senha === "")
        return this.$toast.warning("Preencha os campos", "Alerta", {
          position: "topRight"
        });

      await this.doLogin({
        email: this.email,
        senha: this.senha
      });
      
      if (this.loginSuccessful) this.$router.push("/home");
      else {
        const toast = this.$toast;
        this.loginError.forEach(function(item, indice, array) {
          toast.error(item, "Erro", {
            position: "topRight"
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  padding: 1.5rem;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  .container-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    img {
      width: 2rem;
      height: 2rem;
    }
  }
  form {
    display: flex;
    flex-flow: column;
    *:not(:last-child) {
      margin-bottom: 1rem;
    }
    input {
      padding: 0.5rem;
    }
    button {
      padding: 0.5rem;
      background-color: lightgray;
      border: 1px solid gray;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: lightslategray;
      }
    }
  }
}
</style>
