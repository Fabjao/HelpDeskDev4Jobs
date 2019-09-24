<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item,i) in ticketsAberto" :key="i" class="login">
      <div v-if="load" class="container-loading">
        <img src="@/assets/loading.gif" alt="Loading Icon" />
      </div>      
      <v-expansion-panel-header>
        {{item.titulo}}
        <span class="text-right">{{item.numeroTicket}}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <span>{{item.mensagem}}</span>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="pegarTicket(item.numeroTicket)"
        >Tomar Posse</v-btn>
        <v-spacer></v-spacer>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>


<script>

import { mapState, mapActions } from "vuex";
export default {  
  computed: {
    ...mapState("ticket", ["falhaCadastro", "ticketsAberto","load"])
  },
  methods: {
    ...mapActions("ticket", ["buscar", "tomarPosse"]),
    async pegarTicket(numeroTicket) {
      await this.tomarPosse(numeroTicket);
      await this.buscar("aberto");
      this.buscar("andamento");
    }
  },
  created: async function() {
    await this.buscar("aberto");

    // if (this.falhaCadastro != null) {
    //   const toast = this.$toast;
    //   this.falhaCadastro.forEach(function(item, indice, array) {
    //     toast.error(item, "Erro", {
    //       position: "topRight",
    //       timeout: 9000
    //     });
    //   });
    // }
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