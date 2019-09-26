<template>
  <div>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">TICKETS</h1>
      </v-card-title>

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
    ticketAberto,
    ticktsAndamento,
    ticktsConcluido
  },
  data() {
    return {
      tab: null,
      items: ["Aberto", "Andamento", "Concluido"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      text2: "tudo em andamento"
    };
  },
  computed: {
    ...mapState("ticket", [
      "load",
      "falhaCadastro",
      "numeroTicket",
      "sucessoCadastro"
    ])
  },
  created: async function() {
    await this.buscar("aberto");
  },
  methods: {
    ...mapActions("ticket", [
      "ticketsAbeto",
      "concluido",
      "andamento",
      "buscar"
    ]),
    async submit() {
      await this.ticketsAbeto({
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
        this.sucessoCadastro.forEach(function(item, indice, array) {
          toast.success(item, "Ok", {
            position: "topRight",
            timeout: 9000
          });
        });
        this.titulo = "";
        this.mensagem = "";
      }
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