<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item,i) in ticketsAndamento" :key="i" class="login">
      <pre>{{item.status}}</pre>
      <div v-if="load" class="container-loading">
        <img src="@/assets/loading.gif" alt="Loading Icon" />
      </div>
      <v-expansion-panel-header :class="corTick" @click="pegarTicket(item.numeroTicket)">
        {{item.titulo}}
        <span class="text-right">{{item.numeroTicket}}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <span>{{item.mensagem}}</span>
        <div v-for="(ticket) in ticketEspecifico.lstRespostas" :key="ticket.id">
          <v-spacer></v-spacer>
          <!-- <pre>{{ticket}}</pre> -->
          <!-- <span>{{ticket.usuario.tipo}} - {{ticket.usuario.nome}}</span> | -->
          <span>{{ticket.mensagem}}</span>
        </div>
        <div
          v-show="(item.status ==3 && tipoUsuario =='ATENDENTE') || (item.status ==2 && tipoUsuario =='CLIENTE')"
        >
          <v-flex>
            <v-textarea label="Mensagem" v-model="mensagem"></v-textarea>
          </v-flex>
          <v-btn color="primary" @click="resposta(item.id,item.numeroTicket)">Responder</v-btn>
        </div>
        <v-spacer></v-spacer>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      mensagem: "",
      tipoUsuario: ""
    };
  },
  computed: {
    ...mapState("ticket", [
      "falhaCadastro",
      "ticketsAndamento",
      "load",
      "ticketEspecifico"
    ]),
    corTick(){
      console.log('algo');
      return 'primary'
      
    }
  },
  methods: {
    ...mapActions("ticket", ["buscar", "enviarResposta", "buscarTicket"]),
    async pegarTicket(numeroTicket) {
      await this.buscarTicket(numeroTicket);
    },
    async resposta(guidTicket, numeroTicket) {
      await this.enviarResposta({
        mensagem: this.mensagem,
        ticketId: guidTicket
      });

      console.log("this.falhaCadastro", this.falhaCadastro);

      if (this.falhaCadastro != null) {
        const toast = this.$toast;
        this.falhaCadastro.forEach(function(item, indice, array) {
          toast.error(item, "Erro", {
            position: "topRight",
            timeout: 9000
          });
        });
      }

      this.mensagem = "";
      await this.buscar("andamento");
      await this.buscarTicket(numeroTicket);
    }
  },
  created: async function() {
    this.tipoUsuario = JSON.parse(localStorage.getItem("dev4jobsForum")).tipo;
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