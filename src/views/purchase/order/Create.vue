<template>
  <main-layout>
    <base-header>
      <template #icon>mdi-dolly</template>
      <template #name> Create Purchase Order</template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
    </base-header>

    <v-card class="mx-2">
      <!-- App Bar -->
      <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
        <v-toolbar-title> Reference No</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small color="secondary" class="ma-1" @click="backForm()">
          <v-icon left>mdi-arrow-left</v-icon> Back
        </v-btn>
        <v-btn small color="error" class="ma-1" @click="clear">
          Clear
          <v-icon right>mdi-close-circle-multiple </v-icon>
        </v-btn>
        <v-btn small class="ma-1" color="primary" @click.stop="store" :loading="btnLoading"
          :disabled="!form_valid || btnLoading">
          Save
          <v-icon right>mdi-content-save-all</v-icon>
        </v-btn>
        <v-btn small class="ma-1" color="primary" @click.stop="storeNew" :loading="btnLoading"
          :disabled="!form_valid || btnLoading">
          Save And New
          <v-icon right>mdi-content-save-all</v-icon>
        </v-btn>
      </v-app-bar>
      <v-form ref="PurchaseOrder" v-model="form_valid" lazy-validation>
        <form-purchase />

        <form-item />
      </v-form>
    </v-card>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import FormPurchase from "@/views/purchase/order/Form.vue";
import FormItem from "@/views/purchase/order/FormItem.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CreatePurchaseOrder",
  data() {
    return {
      supplierDialog: false,
      salesOrderDialog: false,
      purchaseOrderDialog: false,
      btnLoading: false,
      form_valid: true,
    };
  },
  methods: {
    ...mapMutations("purchase_order", ["CLEAR_FORM"]),

    store: async function () {
      if (this.$refs.PurchaseOrder.validate()) {
        this.btnLoading = true;
        await this.$axios
          .post("/purchase-order", this.PurchaseOrder, {
            headers: {
              Authorization: this.$store.getters["auth/Token"],
            },
          })
          .then(() => {
            this.btnLoading = false;
            this.CLEAR_FORM();
            this.$router.push({ name: "purchase-order.index" });
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },

    storeNew: async function () {
      if (this.$refs.PurchaseOrder.validate()) {
        this.btnLoading = true;
        await this.$axios
          .post("/purchase-order", this.PurchaseOrder, {
            headers: {
              Authorization: this.$store.getters["auth/Token"],
            },
          })
          .then(() => {
            this.btnLoading = false;
            this.CLEAR_FORM();
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },

    clear() {
      this.CLEAR_FORM();
    },

    backForm() {
      this.CLEAR_FORM();
      this.$router.push({ name: "purchase-order.index" });
    },
  },
  created() {
    this.form_valid = false;
    this.breadcrumbs = [
      { text: "Purchase", disabled: true },
      { text: "Purhcase Order", disabled: true },
      { text: "Create", disabled: false },
    ];
  },

  computed: {
    ...mapGetters("purchase_order", {
      PurchaseOrder: "PurchaseOrder",
    }),
  },
  components: {
    MainLayout,
    BaseHeader,
    "form-purchase": FormPurchase,
    "form-item": FormItem,
  },
};
</script>