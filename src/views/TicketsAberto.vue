<template>
  <div v-if="statusAberto">    
    <div class="text-center">
      <v-pagination v-model="pagina" :length="paginacaoAberto" circle @input="paginacao"></v-pagination>
    </div>
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
          <!-- <v-text-field readonly :value="item.mensagem" outlined></v-text-field> -->
          <!-- <v-textarea readonly :value="item.mensagem" outlined ></v-textarea> -->
           <span>{{item.mensagem}}</span>
          <v-spacer></v-spacer>
          <div v-show="(item.status ==1 && tipoUsuario =='ATENDENTE')">
            <v-btn color="primary" @click="pegarTicket(item.numeroTicket)">Tomar Posse</v-btn>
          </div>
          <v-spacer></v-spacer>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div v-else>
    <h1>Não tem tickets.</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      tipoUsuario: "",
      pagina: 1,
      tamanhoPaginacao: 2
    };
  },
  computed: {
    ...mapState("ticket", [
      "falhaCadastro",
      "ticketsAberto",
      "load",
      "statusAberto",
      "paginacaoAberto"
    ])
  },
  methods: {
    ...mapActions("ticket", ["buscar", "tomarPosse"]),
    async pegarTicket(numeroTicket) {
      await this.tomarPosse(numeroTicket);
      await this.buscar({ status: "aberto"});
    },
   async paginacao(pagina) {
      await this.buscar({status:"aberto",numeroPagina:pagina});
    }
  },
  created: async function() {
    await this.buscar({status:"aberto"});
    this.tipoUsuario = JSON.parse(localStorage.getItem("dev4jobsForum")).tipo;

    // await this.buscar("aberto");

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