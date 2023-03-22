<template>
  <main-layout>
    <base-header>
      <template #icon> mdi-shopping</template>
      <template #name> Order Summary </template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
    </base-header>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
export default {
  name: "OrderSummaryView",

  created() {
    this.breadcrumbs = [
      { text: "Order", disabled: false, to: "/dashboard" },
      { text: "Order Summary", disabled: true },
    ];
  },

  components: {
    MainLayout,
    BaseHeader,
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