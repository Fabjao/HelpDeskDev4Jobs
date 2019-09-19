
import axios from 'axios'

const url = process.env.VUE_APP_URL;

export const login = {
    namespaced: true,
    state: {
        loggingIn: false,
        loginError: null,
        loginSuccessful: false,
        nome: '',
        tipo: ''
    },
    mutations: {
        loginStart: state => state.loggingIn = true,
        loginStop: (state, errorMessage) => {
            state.loggingIn = false;
            state.loginError = errorMessage;
            state.loginSuccessful = !errorMessage;
            state.nome = '';
            state.tipo = '';
        },
        loginSucesso: (state, resultado) => {      
            if (resultado != null) {                
                state.nome = resultado.nome;
                state.tipo = resultado.tipo;
                state.loginSucessful = true;
                console.log('passou aqui');                
            }
        }
    },
    actions: {
        async doLogin({ commit }, loginData) {
            commit('loginStart');
            await axios.post(`${url}/Usuarios/Autenticar`, {
                ...loginData
            })
                .then(response => {

                    if (response.data.status == false)
                        return commit('loginStop', response.data.resultado)

                    commit('loginStop', null)

                    commit('loginSucesso', response.data.resultado)

                    localStorage.setItem('dev4jobsForum', JSON.stringify(response.data.resultado))
                })
                .catch(error => {
                    var arrayMessage = [error.message]
                    commit('loginStop', arrayMessage)
                })
        }
    }
}