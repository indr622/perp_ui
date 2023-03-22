<template>
  <v-tabs>
    <v-tab href="#group"> Group </v-tab>
    <v-tab-item value="group">
      <GroupIndex />
    </v-tab-item>
    <v-tab href="#sub-group"> Sub Group </v-tab>
    <v-tab-item value="sub-group">
      <SubGroupIndex />
    </v-tab-item>
    <v-tab href="#type-order"> Type Order </v-tab>
    <v-tab-item value="type-order">
      <TypeOrderIndex />
    </v-tab-item>
    <v-tab href="#type-in-out"> Type In / Out </v-tab>
    <v-tab-item value="type-in-out">
      <TypeInOutIndex />
    </v-tab-item>
    <v-tab href="#term-payment"> Term Payment </v-tab>
    <v-tab-item value="term-payment">
      <TermPayment />
    </v-tab-item>
    <v-tab href="#term-shipping"> Term Shipping </v-tab>
    <v-tab-item value="term-shipping">
      <TermShipping />
    </v-tab-item>
  </v-tabs>
</template>
<script>
import { mapGetters } from "vuex";
import GroupIndex from "./Group.vue";
import SubGroupIndex from "./SubGroup.vue";
import TypeInOutIndex from "./TypeInOut.vue";
import TypeOrderIndex from "./TypeOrder.vue";
import TermPayment from "./TermPayment.vue";
import TermShipping from "./TermShipping.vue";
export default {
  name: "CustomIndex",
  components: {
    GroupIndex,
    SubGroupIndex,
    TypeOrderIndex,
    TypeInOutIndex,
    TermPayment,
    TermShipping,
  },

  computed: {
    ...mapGetters("auth", {
      ACCESS_TOKEN: "AccessToken",
      TOKEN: "Token",
    }),
  },
};
</script>