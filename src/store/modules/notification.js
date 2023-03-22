const state = () => ({
    notifications: []
})

const mutations = {
    SET_NOTIFICATION(state, payload) {
        state.notifications = payload
    }
}

export default {
    namespaced: true,
    state,
    mutations
}