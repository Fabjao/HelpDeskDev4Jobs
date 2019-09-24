<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item,i) in ticketsAndamento" :key="i" class="login">
      <pre>{{item.status}}</pre>      
      <div v-if="load" class="container-loading">
        <img src="@/assets/loading.gif" alt="Loading Icon" />
      </div>
      <v-expansion-panel-header @click="pegarTicket(item.numeroTicket)">
        {{item.titulo}}
        <span class="text-right">{{item.numeroTicket}}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <span>{{item.mensagem}}</span>
        <div v-for="(ticket,i) in ticketEspecifico.lstRespostas" :key="ticket.id">          
          <v-spacer></v-spacer>
          <span>{{ticket.usuario.tipo}} - {{ticket.usuario.nome}}</span> | <span>{{ticket.mensagem}}</span>
        </div>
        <v-spacer></v-spacer>
        <v-flex>
          <v-textarea label="Mensagem" v-model="mensagem"></v-textarea>
        </v-flex>
        <v-btn color="primary" @click="resposta(item.id)">Responder</v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import ticket from "./Ticket";
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      mensagem: ""
    };
  },
  props: ["tipo"],
  components: {
    ticket
  },
  computed: {
    ...mapState("ticket", [
      "falhaCadastro",
      "ticketsAndamento",
      "load",
      "ticketEspecifico"
    ])
  },
  methods: {
    ...mapActions("ticket", ["buscar", "enviarResposta","buscarTicket"]),
    async pegarTicket(numeroTicket) {      
        await this.buscarTicket(numeroTicket);      
    },
    async resposta(guidTicket) {
      
      await this.enviarResposta({
        mensagem: this.mensagem,
        ticketId: guidTicket
      });
      await this.buscar("andamento");
    }
  },
  created: async function() {
    await this.buscar("andamento");

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