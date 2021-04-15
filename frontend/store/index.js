import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export const state = () => ({
    token: '',
    var1: '',
    var2: ''
})

export const mutations = {
    // incrémentation du compteur d'une valeur [inc]
    setToken(state, token) {
        state.token = token
    },
    deleteToken(state) {
        state.token = ''
    },
    changeVar2(state) {
        state.var2 = "Var changed !"
    }
}