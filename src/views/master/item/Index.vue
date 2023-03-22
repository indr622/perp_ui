<template>
  <div>
    <base-title title="Material" subtitle="List Data Material" />
    <v-btn to="/master/item/create" small elevation="1" color="primary" class="ma-3 white--text float-right"
      @click="loader = 'loading3'">
      Create
      <v-icon right dark>mdi-plus-circle </v-icon>
    </v-btn>

    <item-list />
  </div>
</template>

<script>
import BaseTitle from "@/components/base/BaseTitle.vue";
import ItemList from "@/views/master/item/List.vue";
export default {
  components: { BaseTitle, ItemList },
  name: "ItemIndex",

  destroyed() {
    this.$store.dispatch("item/clearItem");
  },
};
</script>