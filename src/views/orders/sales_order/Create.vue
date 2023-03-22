<template>
  <main-layout>
    <base-header>
      <template #icon> mdi-file</template>
      <template #name> Create Sales Order</template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
    </base-header>

    <v-card class="mx-1" v-if="CAN('Sales-Order-Create')">
      <!-- App Bar -->
      <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
        <v-toolbar-title> Reference No</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small color="secondary" class="ma-2" @click="backForm()">
          <v-icon>mdi-arrow-left</v-icon> Back
        </v-btn>
        <v-btn small color="secondary" class="ma-2" @click="clearForm()">
          Clear
          <v-icon>mdi-close-circle-multiple </v-icon>
        </v-btn>
        <v-btn small class="ma-2" color="primary" @click.stop="store" :loading="btnLoading"
          :disabled="!form_valid || btnLoading">
          Save
          <v-icon right>mdi-content-save-all</v-icon>
        </v-btn>
      </v-app-bar>

      <v-form ref="SalesOrder" v-model="form_valid" lazy-validation>
        <form-sales-order />
        <form-item />
      </v-form>
    </v-card>
  </main-layout>
</template>

<script>
import Form from "./Form.vue";
import FormItem from "./FormItem.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "SalesOrderCreate",

  data() {
    return {
      btnLoading: false,
      form_valid: true,
    };
  },
  created() {
    this.breadcrumbs = [
      { text: "Order", disabled: false },
      { text: "Sales Order", disabled: true },
      { text: "Create", disabled: true },
    ];
  },

  methods: {
    ...mapMutations("sales_order", ["CLEAR_STATE"]),
    ...mapMutations("retailer", ["CLEAR_RETAILER"]),
    store: async function () {
      if (this.$refs.SalesOrder.validate()) {
        this.btnLoading = true;
        await this.$axios
          .post("/sales-order", this.SalesOrder,
            {
              headers: { Authorization: this.$store.getters["auth/Token"] },
            })
          .then(() => {
            this.btnLoading = false;
            this.backForm();
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },
    clearForm() {
      this.CLEAR_STATE();
      this.CLEAR_RETAILER();
    },
    backForm() {
      this.CLEAR_STATE();
      this.CLEAR_RETAILER();
      this.$router.push({ name: "sales-order.index" });
    },
  },
  computed: {
    ...mapGetters("auth", {
      CAN: "Can",
    }),
    SalesOrder() {
      return this.$store.getters["sales_order/SalesOrder"];
    },
  },

  components: {
    MainLayout,
    BaseHeader,
    "form-sales-order": Form,
    "form-item": FormItem,
  },
};
</script>
