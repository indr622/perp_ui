<template>
  <div>
    <base-title title="Retailers" subtitle="List Data Retailers" />
    <v-btn
      to="/master/retailers/create"
      small
      elevation="1"
      color="primary"
      class="ma-3 white--text float-right"
      @click="loader = 'loading3'"
    >
      Create
      <v-icon right dark>mdi-plus-circle </v-icon>
    </v-btn>

    <retailer-list />
  </div>
</template>

<script>
import BaseTitle from "@/components/base/BaseTitle.vue";
import RetailerList from "@/views/master/retailer/List.vue";
export default {
  components: { BaseTitle, RetailerList },
  name: "RetailerIndex",

  destroyed() {
    this.$store.dispatch("retailer/clearRetailer");
  },
};
</script>