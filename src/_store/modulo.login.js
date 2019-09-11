
import axios from 'axios'

const url = process.env.VUE_APP_URL;

export const login = {
    namespaced: true,
    state: {
        loggingIn: false,
        loginError: null,
        loginSuccessful: false
    },
    mutations: {
        loginStart: state => state.loggingIn = true,
        loginStop: (state, errorMessage) => {
            state.loggingIn = false;
            state.loginError = errorMessage;
            state.loginSuccessful = !errorMessage;
        }
    },
    actions: {
        async doLogin({commit}, loginData) {
            
            commit('loginStart');
            await axios.post(`${url}Usuario/autenticar`, {
                ...loginData
            })
                .then(response => {
                                        
                    if (response.data.status == false)
                        return commit('loginStop', response.data.msg)

                        localStorage.setItem('dev4jobsForum',JSON.stringify(response.data.resultado))                        

                    commit('loginStop', null)
                })
                .catch(error => {
                    commit('loginStop', error.message)
                })
        }
    }
}