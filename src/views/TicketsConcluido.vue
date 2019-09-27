<template>
  <div v-if="statusConcluido">
    <div class="text-center">
      <v-pagination v-model="pagina" :length="paginacaoConcluido" circle @input="paginacao"></v-pagination>
    </div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item,i) in ticketsConcluido" :key="i" class="login">
        <div v-if="load" class="container-loading">
          <img src="@/assets/loading.gif" alt="Loading Icon" />
        </div>
        <v-expansion-panel-header class="success" @click="pegarTicket(item.numeroTicket)">
          {{item.titulo}}
          <v-layout justify-center>
            <span>
              <v-rating readonly color="red" :value="item.avaliacao"></v-rating>
            </span>
          </v-layout>
          <span class="text-right">{{item.numeroTicket}}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <span>{{item.mensagem}}</span>
          <div v-for="(ticket) in ticketEspecifico.lstRespostas" :key="ticket.id">
            <span
              :class="(ticket.usuario.tipo =='CLIENTE') ? 'warning': 'info'"
            >{{ticket.usuario.tipo}} - {{ticket.usuario.nome}} - {{ticket.dataCadastro}}</span>
            <v-spacer></v-spacer>
            <span>{{ticket.mensagem}}</span>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </div>
          <v-spacer></v-spacer>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div v-else>
    <h1>Você não tem tickets concluído.</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      mensagem: "",
      responderTicket: "",
      dialog: false,
      pagina: 1
    };
  },
  computed: {
    ...mapState("ticket", [
      "ticketsConcluido",
      "load",
      "statusConcluido",
      "paginacaoConcluido",
      "ticketEspecifico"
    ]),
    cordoTicket() {
      return responderTicket;
    }
  },
  methods: {
    ...mapActions("ticket", ["buscar", "buscarTicket"]),
    async pegarTicket(numeroTicket) {
      await this.buscarTicket(numeroTicket);
    },
    async paginacao(pagina) {
      await this.buscar({ status: "concluido", numeroPagina: pagina });
    }
  },
  created: async function() {
    await this.buscar({ status: "concluido" });
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