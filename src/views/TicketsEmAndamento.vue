<template>
  <div
    v-if="statusAndamento"
  >
    <v-expansion-panels>
      <v-expansion-panel v-for="(item,i) in ticketsAndamento" :key="i" class="login">
        <div v-if="load" class="container-loading">
          <img src="@/assets/loading.gif" alt="Loading Icon" />
        </div>
        <v-expansion-panel-header
          :class="(item.status ==3 && tipoUsuario =='ATENDENTE') || (item.status ==2 && tipoUsuario =='CLIENTE') ? 'error': 'primary'"
          @click="pegarTicket(item.numeroTicket)"
        >
          {{item.titulo}}
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
          <div
            v-show="(item.status ==3 && tipoUsuario =='ATENDENTE') || (item.status ==2 && tipoUsuario =='CLIENTE')"
          >
            <v-flex>
              <v-textarea label="Mensagem" v-model="mensagem"></v-textarea>
            </v-flex>

            <v-btn color="primary" @click="resposta(item.id,item.numeroTicket)">Responder</v-btn>

            <v-btn
              class="ml-3"
              right
              v-show="(item.status ==2 && tipoUsuario =='CLIENTE')"
              color="primary"
              dark
              @click.stop="abrirEncerramento(item.id)"
            >Encerrar Chamado</v-btn>
          </div>
          <v-spacer></v-spacer>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Avaliar Atendimento.</v-card-title>

          <v-card-text>Por favor avalie o nosso Atendimento e muito importante para que possamos melhorar nosso Atendimento.</v-card-text>
          <div class="text-center">
            <v-rating v-model="rating"></v-rating>
          </div>
          <v-card-actions>
            <v-btn color="green darken-1" class="ml-auto" text @click="dialog = false">Cancelar</v-btn>

            <v-btn color="green darken-1" class="ml-auto" text @click="encerrarAtendimento">Concluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
  <div v-else>
    <h1>Não tem tickest em andamento.</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      guidTicket: "",
      mensagem: "",
      tipoUsuario: "",
      responderTicket: "",
      dialog: false,
      rating: 0
    };
  },
  computed: {
    ...mapState("ticket", [
      "falhaCadastro",
      "ticketsAndamento",
      "load",
      "ticketEspecifico",
      "statusAndamento"
    ]),
    cordoTicket() {
      return responderTicket;
    }
  },
  methods: {
    ...mapActions("ticket", [
      "buscar",
      "enviarResposta",
      "buscarTicket",
      "encerrarTicket"
    ]),
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
    },
    abrirEncerramento(guid) {
      this.guidTicket = guid;
      this.dialog = true;
    },
    async encerrarAtendimento() {
      await this.encerrarTicket({
        avaliacao: this.rating,
        ticketId: this.guidTicket
      });

      this.rating = 0;
      if (this.ticketsAberto != null) {
        const toast = this.$toast;
        this.ticketsAberto.forEach(function(item, indice, array) {
          toast.success(item, "Erro", {
            position: "topRight",
            timeout: 9000
          });
        });
      }
      await this.buscar("andamento");
      await this.buscar("concluido");
      this.dialog = false;
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