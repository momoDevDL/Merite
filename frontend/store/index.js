import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export const state = () => ({
    token: ''
})

export const mutations = {
    // incrémentation du compteur d'une valeur [inc]
    setToken(state, token) {
        state.token = token
    },
    deleteToken(state) {
        state.token = ''
    }
}