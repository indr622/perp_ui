<template>
  <main-layout>
    <base-header>
      <template #icon> mdi-file</template>
      <template #name> Sales Order </template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template #button>
        <v-btn v-if="CAN('Sales-Order-Create')" color="primary" class="float-end mb-2" small
          to="/sales-order/create">Create
          New
          <v-icon right>mdi-plus</v-icon>
        </v-btn></template>
    </base-header>
    <v-row dense class="mx-1" v-if="CAN('Sales-Order-View')">
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <sales-order-list />
    </v-row>
  </main-layout>
</template>

<script>
import { mapGetters } from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import SalesOrderList from './List.vue'
export default {
  name: "SalesOrderIndex",
  created() {
    this.breadcrumbs = [
      { text: "Order", disabled: false, to: "/dashboard" },
      { text: "Sales Order", disabled: true },
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
    "sales-order-list": SalesOrderList
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