import axios from "axios";

export default {

    install(Vue) {
        let $axios = axios.create({

            baseURL: process.env.VUE_APP_API_URL,
        });

        Vue.prototype.$api = {
            url: process.env.VUE_APP_API_HOST,
            storageURL: process.env.VUE_APP_STORAGE_URL,
            post: async function (path) {
                return await $axios.post(path);
            },
        };
        Vue.prototype.$axios = $axios;
    }
} 