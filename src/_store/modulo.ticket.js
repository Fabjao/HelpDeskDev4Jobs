
import axios from 'axios'
const url = process.env.VUE_APP_URL;
export const ticket = {
    namespaced: true,
    state: {
        load: false,
        falhaCadastro: null,
        ticketsAberto: null,
        ticketsAndamento: null,
        ticketsConcluido: null,
        ticketEspecifico: { lstRespostas: [] },
        numeroTicket: '',
        ticketCadastrado: null
    },
    mutations: {
        loading: state => state.load = true,
        cadastroFalha: (state, resultado) => {
            state.falhaCadastro = resultado;
            state.load = false;
        },
        cadastroSucesso: (state, resultado) => {
            state.ticketCadastrado = resultado
            state.load = false;
        },
        buscaTicket: (state, { status, dados }) => {

            switch (status) {
                case "aberto":
                    state.ticketsAberto = dados
                    break;
                case "andamento":
                    state.ticketsAndamento = dados
                    break;
                case "concluido":
                    state.ticketsConcluido = dados
                    break;
            }
            state.load = false;
        },
        ticketEspecifico: (state, resultado) => {
            state.ticketEspecifico = resultado
            state.load = false
        }
    },
    actions: {
        async criar({ commit }, ticketData) {
            commit('loading')
            await axios.post(`${url}/Tickets`, {
                ...ticketData
            },
                {
                    headers: { 'autorToken': JSON.parse(localStorage.getItem('dev4jobsForum')).tokenUsuario }
                })
                .then(response => {

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                    return commit('cadastroSucesso', response.data.resultado)

                })
                .catch(error => {
                    commit('cadastroFalha', error.message)
                })
        },
        async buscar({ commit }, status) {
            commit('loading')

            await axios.get(`${url}/Tickets/Todos/${status}`,
                {
                    headers: { 'autorToken': JSON.parse(localStorage.getItem('dev4jobsForum')).tokenUsuario }
                })
                .then(response => {

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                    const dados = response.data.resultado                
                    return commit('buscaTicket', { status, dados })

                })
                .catch(error => {
                    commit('cadastroFalha', error.message)
                })
        },
        async tomarPosse({ commit }, numeroTicket) {
            commit('loading')
            await axios.post(`${url}/Tickets/PegarTicket/${numeroTicket}`, {},
                {
                    headers: { 'autorToken': JSON.parse(localStorage.getItem('dev4jobsForum')).tokenUsuario }
                })
                .then(response => {

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                    return commit('cadastroSucesso', response.data.resultado)

                })
                .catch(error => {
                    commit('cadastroFalha', error.message)
                })
        },
        async buscarTicket({ commit }, numeroTicket) {
            commit('loading')

            await axios.get(`${url}/Tickets/${numeroTicket}`,
                {
                    headers: { 'autorToken': JSON.parse(localStorage.getItem('dev4jobsForum')).tokenUsuario }
                })
                .then(response => {

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                    console.log('response.data.resultado', response.data.resultado);

                    return commit('ticketEspecifico', response.data.resultado)

                })
                .catch(error => {
                    commit('cadastroFalha', error.message)
                })
        },
        async enviarResposta({ commit }, ticketData) {
            console.log('action ticketData ',ticketData);
            
            commit('loading')
            await axios.post(`${url}/Respostas`, { ...ticketData },
                {
                    headers: { 'autorToken': JSON.parse(localStorage.getItem('dev4jobsForum')).tokenUsuario }
                })
                .then(response => {

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                        console.log('resposta', response );
                        state.load = false
                        
                   // return commit('cadastroSucesso', response.data.resultado)

                })
                .catch(error => {
                    commit('cadastroFalha', error.message)
                })
        },
    }
}