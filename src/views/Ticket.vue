    <template>
  <v-expansion-panels>
    <v-expansion-panel class="login">
      <div v-if="load" class="container-loading">
        <img src="@/assets/loading.gif" alt="Loading Icon" />
      </div>
      <v-expansion-panel-header @click="pegarTicket(numeroTicket)">
        {{titulo}}
        <span class="text-right">{{numeroTicket}}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <span>{{texto}}</span>
        <v-spacer></v-spacer>
        <v-btn
          v-show="tipo =='aberto'"
          color="primary"
          @click="tomarPosse(numeroTicket)"
        >Tomar Posse</v-btn>
        <v-spacer></v-spacer>
        <div v-show="tipo !='aberto'">            
            <div v-for="(ticket,i) in ticketEspecifico.lstRespostas" :key="ticket.id">
              <span>{{ticket.mensagem}} --MOGIGIGIGIGII {{i}}</span>
              
            </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["titulo", "numeroTicket", "texto", "tipo"],
  computed: {
    ...mapState("ticket", ["load","ticketEspecifico"])
  },
  methods: {
    ...mapActions("ticket", ["buscarTicket"]),
    tomarPosse(numeroTicket) {
      this.$emit("pai", numeroTicket);
    },
    async pegarTicket(numeroTicket) {
      if (this.tipo != "aberto") {
        await this.buscarTicket(numeroTicket);
      }
    }
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