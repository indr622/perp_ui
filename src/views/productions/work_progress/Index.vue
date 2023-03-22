<template>
    <main-layout>
        <base-header>
            <template #icon> mdi-file</template>
            <template #name> Work In Progress</template>
            <template #breadcrumbs>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template #divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </template>
            <template #button>
                <v-btn color="primary" class="float-end mb-2" small to="/work-progress/create">Create
                    New
                    <v-icon right>mdi-plus</v-icon>
                </v-btn></template>
        </base-header>
        <v-row dense class="mx-1">
            <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
            <Inventory-list />
        </v-row>
    </main-layout>
</template>
  
<script>
import { mapGetters } from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import WorkProgressList from "./List.vue";
export default {
    name: "WorkInProgressView",

    created() {
        this.breadcrumbs = [
            { text: "Dashboard", disabled: false, to: "/dashboard" },
            { text: "Work In Progress", disabled: true },
        ];
    },

    computed: {
        ...mapGetters("auth", {
            CAN: "Can",
        }),
    },

    components: {
        MainLayout,
        BaseHeader,
        "Inventory-list": WorkProgressList,
    },
};
</script>
<style scoped>
::v-deep .v-data-table-header {
    background-color: #ebebeb59;
}

::v-deep th {
    color: #000 !important;
}
</style>