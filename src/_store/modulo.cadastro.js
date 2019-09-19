
import axios from 'axios'
const url = process.env.VUE_APP_URL;
export const cadastro = {
    namespaced: true,
    state: {
        nome: '',
        email: '',
        cadastroFalha: null,
        load: false
    },
    mutations: {
        loading: state => state.load = true,
        usuario: (state, login) => {

            state.nome = login.resultado.nome;
            state.email = login.resultado.email;
            state.load = false
            state.cadastroFalha = null
        },
        cadastroFalha: (state, message) => {

            state.cadastroFalha = message
            state.nome = '',
                state.email = '',
                state.load = false
        }
    },
    actions: {
        async inserir({ commit }, loginData) {
            commit('loading')
            await axios.post(`${url}/Usuarios`, {
                ...loginData
            })
                .then(response => {

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                    commit('usuario', response.data)

                })
                .catch(error => {
                    console.log('Falha', error);

                    commit('cadastroFalha', error.message)
                })
        }
    }
}