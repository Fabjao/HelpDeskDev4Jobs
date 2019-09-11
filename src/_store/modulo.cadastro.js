
import axios from 'axios'

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
            console.log('chegou aqui ??');
            
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
            await axios.post('http://localhost:51847/api/usuario', {
                ...loginData
            })
                .then(response => {

                    if (response.data.status == false)
                        return commit('cadastroFalha', response.data.resultado)

                    commit('usuario', response.data)

                })
                .catch(error => {
                    commit('cadastroFalha', error.message)
                })
        }
    }
}