import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: '',
        token: window.sessionStorage.getItem('token')
    },
    mutations: {
        login: (state, payload, data) => {
            state.user = payload
            state.token = data
            window.sessionStorage.setItem('token', data)
        },
        signup: (state) => {
            state.user = undefined
        },
        logout: (state) => {
            state.token = null
            window.sessionStorage.removeItem('token')
        }
    },
    actions: {
        UserLogin({ commit }, data){
            commit('login', data)
        },
        UserLogout({ commit }){
            commit('logout')
        },
        UserName({ commit }, data){
            commit('USERNAME', data)
        }
    }
})

export default store
