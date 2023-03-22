<template>
  <main-layout>
    <base-header>
      <template #icon> mdi-file</template>
      <template #name> Quotation </template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template #button>
        <v-btn v-if="CAN('Quotation-Create')" color="primary" class="float-end mb-2" small to="/quotation/create">Create
          New
          <v-icon right>mdi-plus</v-icon>
        </v-btn></template>
    </base-header>
    <v-row dense class="mx-1" v-if="CAN('Quotation-View')">
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />

      <quotation-list />
    </v-row>
  </main-layout>
</template>

<script>
import { mapGetters } from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import QuotationList from "./List.vue";
export default {
  name: "QuotationView",

  created() {
    this.breadcrumbs = [
      { text: "Order", disabled: false, to: "/dashboard" },
      { text: "Quotation", disabled: true },
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
    "quotation-list": QuotationList,
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