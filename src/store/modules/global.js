const getDefaultState = () => {
    return {
        loaded: false,

    };
};
const state = getDefaultState();


const mutations = {

    setLoaded(state, loaded) {
        state.loaded = loaded;
    },


    resetState(state) {
        Object.assign(state, getDefaultState());
    },
};

const actions = {
    reinit({ commit }) {
        commit("resetState");
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
