
const state = () => ({
    loaded: false,
    units: [],
    form_data: {
        name: "",
        description: "",
        is_active: true,
    },
})

const mutations = {
    SET_UNIT(state, payload) {
        state.units = payload;
    },
    SET_LOADED(state, loaded) {
        state.loaded = loaded;
    },
    CLEAR_UNIT(state) {
        state.units = [];
    },
    CLEAR_STATE(state) {
        state.units = [];
        state.form_data = {
            name: "",
            description: "",
            is_active: true,
        }
    },
}

const actions = {
    clearUnit({ commit }) {
        commit("CLEAR_DATA");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },
}
const getters = {
    Units: state => state.units,
    FormData: state => state.form_data,
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
