<template>
  <div class="login">
    <v-card color="basil" class="mx-auto">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">Tickets</h1>
      </v-card-title>

      <v-card class="mx-auto" width="90%">
        <div v-if="load" class="container-loading">
          <img src="@/assets/loading.gif" alt="Loading Icon" />
        </div>
        <v-flex>
          <v-text-field v-model="titulo" label="Titulo"></v-text-field>
        </v-flex>
        <v-flex>
          <v-textarea label="Mensagem" v-model="mensagem"></v-textarea>
        </v-flex>
        <v-btn color="primary" @click="submit">Registrar</v-btn>
      </v-card>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item" @click="CarregarItem(item)">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <v-card flat color="basil">
            <v-card-text v-show="item == 'Aberto'">
              <ticketAberto />
            </v-card-text>
            <v-card-text v-show="item == 'Andamento'">
              <ticktsAndamento />
            </v-card-text>
            <v-card-text v-show="item == 'Concluido'">
              <ticktsConcluido />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import ticketAberto from "./TicketsAberto";
import ticktsAndamento from "./TicketsEmAndamento";
import ticktsConcluido from "./TicketsConcluido";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ticktsAndamento,
    ticktsConcluido,
    ticketAberto
  },
  data() {
    return {
      tab: null,
      titulo: "",
      mensagem: "",
      items: ["Aberto", "Andamento", "Concluido"]
    };
  },
  computed: {
    ...mapState("ticket", [
      "load",
      "falhaCadastro",
      "numeroTicket",
      "tickets",
      "ticketCadastrado"
    ])
  },
  created: async function() {
     await this.buscar("aberto");
    // await this.buscar("andamento");
    // await this.buscar("concluido");
  },
  methods: {
    ...mapActions("ticket", ["criar", "buscar"]),
    async submit() {
      await this.criar({
        titulo: this.titulo,
        mensagem: this.mensagem
      });

      if (this.falhaCadastro != null) {
        const toast = this.$toast;
        this.falhaCadastro.forEach(function(item, indice, array) {
          toast.error(item, "Erro", {
            position: "topRight",
            timeout: 9000
          });
        });
      } else {
        const toast = this.$toast;
        this.ticketCadastrado.forEach(function(item, indice, array) {
          toast.success(item, "Ok", {
            position: "topRight",
            timeout: 9000
          });
        });
        this.titulo = "";
        this.mensagem = "";
      }
      await this.buscar("aberto");
    },
    async CarregarItem(item) {            
      switch (item) {
        case "Aberto":
          await this.buscar("aberto");
          break;
        case "Andamento":
          await this.buscar("andamento");
          break;
        case "Concluido":
          await this.buscar("concluido");
          break;
      }
    }
  }
};
</script>




<style scoped lang="scss">
.login {
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
}
</style>