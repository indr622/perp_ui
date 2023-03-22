const state = () => ({
    summary: [],
    chart: [],
})
const mutations = {
    SET_SUMMARY: (state, payload) => {
        state.summary = payload;
    },
    SET_CHART: (state, payload) => {
        state.chart = payload;
    },

    CLEAR_STATE: (state) => {
        state.summary = [];
        state.chart = [];
    }
}
const getters = {
    Summary: state => {
        return state.summary;
    },
    Chart: state => {
        return state.chart;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}