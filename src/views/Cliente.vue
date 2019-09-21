<template>
  <div>
    <v-card color="basil" class="mx-auto">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">TICKETS</h1>
      </v-card-title>

      <v-flex class="m-10">
        <v-text-field v-model="titulo" label="Titulo"></v-text-field>
      </v-flex>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <v-card flat color="basil">
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
import ticktsAndamento from "./TicketsEmAndamento";
import ticktsConcluido from "./TicketsConcluido";
export default {
  components: {
    ticktsAndamento,
    ticktsConcluido
  },
  data() {
    return {
      tab: null,
      titulo: "",
      items: ["Andamento", "Concluido"]
    };
  }
};
</script>