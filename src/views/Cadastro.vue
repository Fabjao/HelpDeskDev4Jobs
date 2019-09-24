<template>
  <div class="login">
    <div v-if="load" class="container-loading">
      <img src="@/assets/loading.gif" alt="Loading Icon" />
    </div>
    <form @submit.prevent="inserirCadastro">
      <h1>Cadastro</h1>
      <v-text-field v-model="unome" label="Nome"></v-text-field>
      <v-text-field v-model="uemail" label="E-mail"></v-text-field>
      <v-text-field
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="Senha"
        class="input-group--focused"
        v-model="usenha"
      ></v-text-field>
      <v-text-field
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="Confirmação Senha"
        class="input-group--focused"
        v-model="usenhaCofirmacao"
      ></v-text-field>
      <v-select v-model="utipo" :items="items" label="Selecione um tipo de usuário."></v-select>
      <button type="submit">Cadastrar</button>
      <router-link to="/">
        <a>Login</a>
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
      unome: "",
      uemail: "",
      usenha: "",
      utipo: "",
      usenhaCofirmacao: "",
      items: ["cliente", "atendente"]
    };
  },
  created: function() {
    //Se ja tiver logado mandar para a pagina home do usuario
    if (store.state.login.loginSuccessful) this.$router.push("/home");
  },
  computed: {
    ...mapState("cadastro", ["email", "nome", "load", "cadastroFalha"])
  },
  methods: {
    ...mapActions("cadastro", ["inserir"]),
    async inserirCadastro() {
      
      await this.inserir({
        nome: this.unome,
        email: this.uemail,
        senha: this.usenha,
        confirmaSenha: this.usenhaCofirmacao,
        tipo: this.utipo
      });

      if (this.cadastroFalha != null) {
        const toast = this.$toast;
        this.cadastroFalha.forEach(function(item, indice, array) {
          toast.error(item, "Erro", {
            position: "topRight", timeout: 9000
          });
        });
      } else {
        this.$toast.success("Cadastro efetuado faça o login.", "Ok", {
          position: "topRight"
        });
        this.$router.push("/");
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
