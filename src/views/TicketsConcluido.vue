<template>
  <div>
    <ticket
      v-for="item in ticketsConcluido"
      :key="item.numeroTicket"
      :titulo="item.titulo"
      :numeroTicket="item.numeroTicket"
      :texto="item.mensagem"
    />
  </div>
  
</template>
<script>
import ticket from "./Ticket";
import { mapState, mapActions } from "vuex";
export default {
  props: ["tipo"],
  components: {
    ticket
  },
  computed: {
    ...mapState("ticket", ["falhaCadastro", "ticketsConcluido","load"])
  },
  methods: {
    ...mapActions("ticket", ["buscar"])
  // },
  // created: async function() {
  //   await this.buscar("concluido");

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