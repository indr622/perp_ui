<template>
    <main-layout>
        <base-header>
            <template #icon> mdi-file</template>
            <template #name> Edit Quotation</template>
            <template #breadcrumbs>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template #divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </template>
        </base-header>

        <v-card class="mx-1" v-if="CAN('Quotation-Edit')">
            <!-- App Bar -->
            <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                <v-toolbar-title> Reference No</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn small color="secondary" class="ma-2" to="/quotation">
                    <v-icon>mdi-arrow-left</v-icon> Back
                </v-btn>
                <v-btn small color="secondary" class="ma-2" to="/quotation/create">
                    Clear
                    <v-icon>mdi-close-circle-multiple </v-icon>
                </v-btn>
                <v-btn small class="ma-2" color="primary" @click.stop="update" :loading="btnLoading"
                    :disabled="!form_valid || btnLoading">
                    Update
                    <v-icon right>mdi-content-save-all</v-icon>
                </v-btn>
            </v-app-bar>

            <v-form ref="Quotation" v-model="form_valid" lazy-validation>
                <form-quotation />

                <form-item />
            </v-form>
        </v-card>
    </main-layout>
</template>

<script>
import { mapGetters } from "vuex";
import Form from "./Form.vue";
import FormItem from "./FormItem.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";

export default {
    name: "QuotationCreate",

    data() {
        return {
            btnLoading: false,
            form_valid: true,
        };
    },
    created() {
        this.breadcrumbs = [
            { text: "Order", disabled: false },
            { text: "Quotation", disabled: true },
            { text: "Create", disabled: true },
        ];
    },

    methods: {
        update: async function () {
            if (this.$refs.Quotation.validate()) {
                this.btnLoading = true;
                await this.$axios
                    .put("/quotation/" + this.Quotation.id, this.Quotation,
                        {
                            headers: { Authorization: this.$store.getters["auth/Token"] },
                        })
                    .then(() => {
                        this.btnLoading = false;
                        this.$router.push({ name: "quotation.index" });
                    })
                    .catch(() => {
                        this.btnLoading = false;
                    });
            }
        },
        clear() {
            this.$store.commit("quotation/CLEAR_STATE");
            this.$store.commit("retailer/CLEAR_STATE");
        },

    },

    computed: {
        ...mapGetters("auth", {
            CAN: "Can",
        }),
        Quotation() {
            return this.$store.getters["quotation/Quotation"];
        },
    },

    destroyed() {
        this.$store.commit("quotation/CLEAR_STATE");
        this.$store.commit("retailer/CLEAR_STATE");
    },

    components: {
        MainLayout,
        BaseHeader,
        "form-quotation": Form,
        "form-item": FormItem,
    },
};
</script>
