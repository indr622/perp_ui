<template>
  <main-layout>
    <base-header>
      <template v-slot:icon>mdi-file-document</template>
      <template v-slot:name> Work Order </template>
      <template v-slot:breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
    </base-header>
    <v-card class="mx-1">
      <v-tabs>
        <v-tab href="#list"> List Order </v-tab>
        <v-tab-item value="list"> <list-work-order /> </v-tab-item>
        <v-tab href="#status"> Order Status </v-tab>
        <v-tab-item value="status"> <status-work-order /> </v-tab-item>
      </v-tabs>
    </v-card>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import StatusWorkOrder from "./StatusWorkOrder.vue";
import ListWorkOrder from "./ListWorkOrder.vue";
export default {
  name: "WorkOrderView",
  created() {
    this.breadcrumbs = [
      { text: "Dashboard", disabled: false, to: "/dashboard" },
      { text: "Work Order", disabled: true },
    ];
  },
  components: {
    MainLayout,
    BaseHeader,
    StatusWorkOrder,
    ListWorkOrder,
  },
};
</script>