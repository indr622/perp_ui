<template>
  <div>
    <base-title title="Customers" subtitle="List Data Customers" />
    <v-btn
      to="/master/customers/create"
      small
      elevation="1"
      color="primary"
      class="ma-3 white--text float-right"
      @click="loader = 'loading3'"
    >
      Create
      <v-icon right dark>mdi-plus-circle </v-icon>
    </v-btn>
    <customer-list />
  </div>
</template>

<script>
import BaseTitle from "@/components/base/BaseTitle.vue";
import CustomerList from "@/views/master/customer/List.vue";
export default {
  components: { CustomerList, BaseTitle },
  name: "CustomersView",

  destroyed() {
    this.$store.dispatch("customer/clearCustomer");
  },
};
</script>