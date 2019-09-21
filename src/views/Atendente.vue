<template>
  <div>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">TICKETS</h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
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
export default {
  components: {
    ticketAberto,
    ticktsAndamento,
    ticktsConcluido
  },
  data() {
    return {
      tab: null,
      items: ["Aberto", "Andamento","Concluido"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      text2: "tudo em andamento"
    };
  }
};
</script>