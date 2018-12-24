import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: undefined
    },
    mutations: {
        login (state, payload) {
            state.user = payload
        },
        signup (state) {
            state.user = undefined
        }
    },
    actions: {
        login (context, payload) {
            context.commit('login', payload)
        },
        signup (context) {
            context.commit('signup')
        }
    }
})

export default store
