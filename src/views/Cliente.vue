<template>
    <div>        
        <v-container>

        </v-container>


    </div>
</template>

<script>
export default {
    created(){
        if (this.$store.state.login.tipo == "CLIENTE") this.$router.push("/cliente");
    }
}
</script>