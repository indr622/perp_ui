<template>
  <div>
    <base-title title="Suppliers" subtitle="List Data Suppliers" />
    <v-btn
      to="/master/suppliers/create"
      small
      elevation="1"
      color="primary"
      class="ma-3 white--text float-right"
      @click="loader = 'loading3'"
    >
      Create
      <v-icon right dark>mdi-plus-circle </v-icon>
    </v-btn>
    <supplier-list />
  </div>
</template>

<script>
import BaseTitle from "@/components/base/BaseTitle.vue";
import SupplierList from "@/views/master/supplier/List.vue";
export default {
  components: { BaseTitle, SupplierList },
  name: "SuppliersView",

  destroyed() {
    this.$store.dispatch("supplier/clearSupplier");
  },
};
</script>