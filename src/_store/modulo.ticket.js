
import axios from 'axios'
const url = process.env.VUE_APP_URL;
export const ticket = {
    namespaced: true,
    state: {
        load: false,
        statusAberto: null,
        statusAndamento: null,
        statusConcluido: null,
        falhaCadastro: null,
        ticketsAberto: null,
        ticketsAndamento: null,
        ticketsConcluido: null,
        ticketEspecifico: { lstRespostas: [] },
        numeroTicket: '',
        ticketCadastrado: null,
        ticketConcluido: null,
        paginacaoAberto: null,
        paginacaoAndamento: null,
        paginacaoConcluido: null
    },
    getters: {
        quantidadeRegistroAberto: state => {
            return state.paginacaoAberto
        }
    },
    mutations: {
        loading: state => state.load = true,
        cadastroFalha: (state, resultado) => {
            state.falhaCadastro = resultado;
            state.ticketCadastrado = null;
            state.load = false;
        },
        cadastroSucesso: (state, resultado) => {
            state.ticketCadastrado = resultado
            state.falhaCadastro = null;
            state.load = false;
        },
        buscaTicket: (state, { status, dados }) => {
            switch (status) {
                case "aberto":
                    state.ticketsAberto = dados.resultado
                    state.statusAberto = dados.status
                    state.paginacaoAberto = dados.paginacao.totalPaginas

                    break;
                case "andamento":
                    state.ticketsAndamento = dados.resultado
                    state.statusAndamento = dados.status
                    state.paginacaoAndamento = dados.paginacao.totalPaginas
                    break;
                case "concluido":
                    state.ticketsConcluido = dados.resultado
                    state.statusConcluido = dados.status
                    state.paginacaoConcluido = dados.paginacao.totalPaginas
                    break;
            }
            state.load = false;
        },
        ticketEspecifico: (state, resultado) => {
            state.ticketEspecifico = resultado
            state.load = false
        },
        respostaCadastrada: (state) => {
            state.load = false
            state.falhaCadastro = null
        },
        ticketEncerrado: (state, resultado) => {
            state.load = false
            state.ticketConcluido = resultado
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
        async buscar({ commit }, { status, numeroPagina, quantidadePagina }) {
            commit('loading')
            if (numeroPagina === undefined) numeroPagina = 1;
            if (quantidadePagina === undefined) quantidadePagina = 10;

            await axios.get(`${url}/Tickets/Todos/${status}?numeroPagina=${numeroPagina}&quantidadePagina=${quantidadePagina}`,
                {
                    headers: { 'autorToken': JSON.parse(localStorage.getItem('dev4jobsForum')).tokenUsuario }
                })
                .then(response => {
                    const dados = response.data
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

                    return commit('ticketEspecifico', response.data.resultado)

                })
                .catch(error => {
                    commit('cadastroFalha', error.message)
                })
        },
        async enviarResposta({ commit }, ticketData) {
            commit('loading')
            await axios.post(`${url}/Respostas`, { ...ticketData },
                {
                    headers: { 'autorToken': JSON.parse(localStorage.getItem('dev4jobsForum')).tokenUsuario }
                })
                .then(response => {
                    console.log('Respota response', response);

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                    return commit('respostaCadastrada')

                })
                .catch(error => {
                    console.log('resposta errror', error);

                    commit('cadastroFalha', error.message)
                })
        },
        async encerrarTicket({ commit }, ticketData) {


            commit('loading')
            await axios.post(`${url}/Tickets/Fechar`, { ...ticketData },
                {
                    headers: { 'autorToken': JSON.parse(localStorage.getItem('dev4jobsForum')).tokenUsuario }
                })
                .then(response => {

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                    return commit('respostaCadastrada', response.data.resultado)

                })
                .catch(error => {
                    commit('cadastroFalha', error.message)
                })
        },
    }
}