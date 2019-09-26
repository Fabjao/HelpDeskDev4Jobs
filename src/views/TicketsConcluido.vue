<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item,i) in ticketsConcluido" :key="i" class="login">
        <div v-if="load" class="container-loading">
          <img src="@/assets/loading.gif" alt="Loading Icon" />
        </div>
        <v-expansion-panel-header class="success" @click="pegarTicket(item.numeroTicket)">
          {{item.titulo}}
          <span class="text-center">
            <v-rating readonly color="red" :value="item.avaliacao"></v-rating>
          </span>          
          <span class="text-right">{{item.numeroTicket}}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <span>{{item.mensagem}}</span>
          <div v-for="(ticket) in ticketEspecifico.lstRespostas" :key="ticket.id">
            <v-spacer></v-spacer>
            <!-- <pre>{{ticket}}</pre> -->
            <span>{{ticket.usuario.tipo}} - {{ticket.usuario.nome}}</span> |
            <span>{{ticket.mensagem}}</span>
          </div>
          <v-spacer></v-spacer>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      mensagem: "",
      responderTicket: "",
      dialog: false
    };
  },
  computed: {
    ...mapState("ticket", [
      "ticketsConcluido",
      "load"
    ]),
    cordoTicket() {
      return responderTicket;
    }
  },
  methods: {
    ...mapActions("ticket", ["buscar", "buscarTicket","ticketEspecifico"]),
    async pegarTicket(numeroTicket) {
      await this.buscarTicket(numeroTicket);
    }
  },
  created: async function() {
    //this.tipoUsuario = JSON.parse(localStorage.getItem("dev4jobsForum")).tipo;
   // await this.buscar("concluido");
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