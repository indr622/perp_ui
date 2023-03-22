<template>
  <main-layout>
    <base-header>
      <template #icon>mdi-dolly</template>
      <template #name> Shipping Intruction </template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template #button>
        <v-btn color="primary" class="float-end mb-2" small to="/purchase-shipping/create">Create New
          <v-icon right>mdi-plus</v-icon>
        </v-btn></template>
    </base-header>
    <v-row dense class="mx-1">
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <purchase-shipping-list />
    </v-row>
  </main-layout>
</template>

<script>
import PurchaseShipping from "@/views/purchase/shipping/List.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
export default {
  name: "PurchaseOrderView",

  created() {
    this.breadcrumbs = [
      { text: "Purchase", disabled: false },
      { text: "Shipping Intruction", disabled: true },
    ];
  },

  destroyed() {
    this.$store.commit("purchase_shipping/CLEAR_PURCHASE_SHIPPINGS");
  },

  components: {
    MainLayout,
    BaseHeader,
    "purchase-shipping-list": PurchaseShipping,
  },
};
</script>
