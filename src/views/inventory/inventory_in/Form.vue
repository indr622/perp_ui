<template>
  <div>
    <v-row dense class="mx-1">
      <base-column :lg="3" :md="6" :sm="12">
        <v-text-field readonly placeholder="Inventory In Number" outlined dense :append-icon="'mdi-magnify'" hide-details
          @click:append="openPurchaseOrderDialog()"></v-text-field>
      </base-column>
      <base-column :lg="3" :md="6" :sm="12">
        <v-text-field readonly placeholder="Purchase Order Number" outlined dense :append-icon="'mdi-magnify'"
          hide-details @click:append="openPurchaseOrderDialog()"></v-text-field>
      </base-column>
    </v-row>
    <!-- Referenci Number -->
    <v-divider class="my-2"></v-divider>

    <!-- Customer And Retailer Information -->
    <v-row dense class="mx-2 mt-6 mb-6">
      <base-column :lg="6" :md="6" :sm="12">
        <v-row>
          <base-column :lg="6" :md="6" :sm="12">
            <v-card>
              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                <v-toolbar-title>
                  <v-icon>mdi-account</v-icon>
                  Supplier
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn outlined small color="primary" @click="openSupplierDialog">
                  Choose
                  <v-icon right>mdi-pencil</v-icon>
                </v-btn>
              </v-app-bar>
              <v-list-item three-line v-if="PurchaseOrder.supplier_id">
                <v-list-item-content>
                  <v-list-item-title>{{
                    PurchaseOrder.supplier_name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ PurchaseOrder.supplier_phone ? PurchaseOrder.supplier_phone : "N/A" }} |
                    {{ PurchaseOrder.supplier_email ? PurchaseOrder.supplier_email : "N/A" }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ PurchaseOrder.supplier_address ? PurchaseOrder.supplier_address : "N/A" }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </base-column>
          <base-column :lg="6" :md="6" :sm="12">
            <v-select label="Warehouse" :items="WAREHOUSES" :rules="rule_warehouse" v-model="PurchaseOrder.warehouse_id"
              outlined item-text="name" item-value="id" dense></v-select>
          </base-column>
        </v-row>
      </base-column>
      <base-column :lg="6" :md="6" :sm="12">
        <v-row>
          <base-column :lg="6" :md="6" :sm="12">
            <v-text-field type="date" label="Ingoing Date" outlined dense :rules="rule_ingoing_date"></v-text-field>
          </base-column>
        </v-row>
      </base-column>
    </v-row>
    <v-divider></v-divider>
    <v-row dense class="mx-2 mt-6 mb-6">
      <base-column :lg="3" :md="3" :sm="12">
        <v-row>
          <base-column :lg="12" :md="12" :sm="12">
            <v-textarea label="remark" outlined dense rows="4"></v-textarea>
          </base-column>
        </v-row>
      </base-column>
    </v-row>
    <v-dialog v-if="dialogPurchase" v-model="dialogPurchase" max-width="1200px" persistent>
      <purchase-modal v-on:closePurchaseDialog="closePurchaseDialog" v-on:selectPurchase="selectPurchase" />
    </v-dialog>

    <v-dialog v-if="dialogSupplier" v-model="dialogSupplier" max-width="1200px" persistent>
      <supplier-modal v-on:closeSupplierDialog="closeSupplierDialog" v-on:selectSupplier="selectSupplier" />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
import SupplierModal from "@/components/modal/SupplierModal.vue";
import PurchaseOrderModal from '@/components/modal/PurchaseOrderModal.vue';
export default {
  name: "InventoryInForm",

  data() {
    return {
      dialogSalesOrder: false,
      dialogPurchase: false,
      dialogSupplier: false,
      dialogShipping: false,
      disabled_po_type: false,
    };
  },

  created() {
    this.getPph();
    this.getCurrency();
    this.getWarehouse();
  },
  methods: {
    ...mapActions("pph", ["setPph"]),
    ...mapMutations("purchase_order", ["CLEAR_FORM", "SET_PO_FROM_SO"]),
    async getPph() {
      await this.$axios("/pph?active=1", {
        headers: {
          Authorization: this.$store.getters["auth/Token"],
        },
      }).then(({ data }) => {
        this.$store.commit("pph/SET_PPHS", data.pph);
      });
    },
    async getCurrency() {
      await this.$axios("/currency?active=1", {
        headers: {
          Authorization: this.$store.getters["auth/Token"],
        },
      }).then(({ data }) => {
        this.$store.commit("currency/SET_CURRENCIES", data.currency);
      });
    },

    async getWarehouse() {
      await this.$axios("/warehouse?active=1", {
        headers: {
          Authorization: this.$store.getters["auth/Token"],
        },
      }).then(({ data }) => {
        this.$store.commit("warehouse/SET_WAREHOUSES", data.warehouse.data);
      });
    },

    changePPH(val) {
      this.$axios
        .get("/pph/" + val, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.setPph(data.pph);
        });
    },

    selectSupplier(val) {
      this.$store.commit("purchase_order/SET_SUPPLIER", val); }, selectCustomer(val) { this.$store.commit("purchase_order/SET_SHIPPING", val); },
    selectWarehouse(val) {
      this.$store.commit("purchase_order/SET_SHIPPING", val);
    },

    selectPurchase(val) {
      this.$axios
        .get("/purchase-order/" + val.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.$store.commit("purchase_order/SET_PURCHASE_ORDER", data.purchase_orders);
          this.$router.push("/purchase-order/edit");
        })
        .catch((e) => {
          alert(e);
        });
    },
    openPurchaseOrderDialog() {
      this.dialogPurchase = true;
    },
    closePurchaseDialog() {
      this.dialogPurchase = false;
    },
    openSupplierDialog() {
      this.dialogSupplier = true;
    },

    closeSupplierDialog() {
      this.dialogSupplier = false;
    },
    changePurchaseType(val) {
      if (val === "material") {
        this.$store.commit("purchase_order/CLEAR_PRODUCT_LIST");
      } else {
        this.$store.commit("purchase_order/CLEAR_ITEM_LIST");
      }
    },
  },
  computed: {
    ...mapState("purchase_order", {
      PurchaseOrder: (state) => state.purchase_order,
    }),
    ...mapGetters("purchase_order", {
      PURCHASE_TYPE: "PurchaseType",
      PURCHASE_STATUS: "PurchaseStatus",
      DISABLED_PO_TYPE: "DisabledPoType",
    }),
    ...mapGetters("pph", {
      PPHS: "Pphs",
    }),
    ...mapGetters("currency", {
      CURRENCIES: "Currencies",
    }),
    ...mapGetters("warehouse", {
      WAREHOUSES: "Warehouse",
    }),
    ...mapGetters("term_payment", {
      TERM_PAYMENT: "TermPayment",
    }),
    ...mapGetters("term_shipping", {
      TERM_SHIPPING: "TermShipping",
    }),
  },


  components: {
    BaseColumn,
    "supplier-modal": SupplierModal,
    "purchase-modal": PurchaseOrderModal,
  },
};
</script>