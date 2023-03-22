<template>
  <div>
    <v-row dense class="mx-1 mb-4">
      <base-column :lg="3" :md="6" :sm="12">
        <v-text-field v-model="PurchaseOrder.so_number" readonly placeholder=" Sales Order Number" outlined dense
          :append-icon="'mdi-magnify'" hide-details @click:append="openSalesOrderDialog()"></v-text-field>
      </base-column>

      <base-column :lg="3" :md="6" :sm="12">
        <v-text-field readonly placeholder="Purchase Order Number" outlined dense :append-icon="'mdi-magnify'"
          hide-details v-model="PurchaseOrder.po_number" @click:append="openPurchaseOrderDialog()"></v-text-field>
      </base-column>
    </v-row>
    <v-divider></v-divider>

    <v-row dense class="mx-2 mt-6 mb-6">
      <base-column :lg="6" :md="6" :sm="12">
        <v-row>
          <base-column :lg="6" :md="6" :sm="12">
            <v-select label="Purchase Type" :items="PURCHASE_TYPE" v-model="PurchaseOrder.type" outlined dense
              :rules="rule_type" item-id="name" @change="changePurchaseType" :disabled="DISABLED_PO_TYPE"></v-select>
          </base-column>
          <base-column :lg="6" :md="6" :sm="12">
            <v-text-field label="Order Date" outlined type="date" dense v-model="PurchaseOrder.order_date"
              :rules="rule_order_date"></v-text-field>
          </base-column>
        </v-row>
        <v-row>
          <base-column :lg="6" :md="6" :sm="12">
            <v-select :items="PURCHASE_STATUS" label="Purchase Status" outlined dense item-text="name"
              v-model="PurchaseOrder.status" :rules="rule_status"></v-select>
          </base-column>
          <base-column :lg="6" :md="6" :sm="12">
            <v-text-field label="Request Delivery Date" type="date" outlined dense v-model="PurchaseOrder.request_date"
              :rules="rule_request_date"></v-text-field>
          </base-column>
        </v-row>
      </base-column>
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
            <v-card>
              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                <v-toolbar-title>
                  <v-icon>mdi-map-marker</v-icon>
                  Shipping Address
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn outlined small color="primary" @click="openShippingDialog">
                  Choose
                  <v-icon right>mdi-pencil</v-icon>
                </v-btn>
              </v-app-bar>
              <v-list-item three-line v-if="PurchaseOrder.shipping_address">
                <v-list-item-content>

                  <v-list-item-subtitle>
                    {{
                      PurchaseOrder.shipping_name ? PurchaseOrder.shipping_name : "N/A"
                    }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{
                      PurchaseOrder.shipping_email ? PurchaseOrder.shipping_email : "N/A"
                    }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ PurchaseOrder.shipping_address ? PurchaseOrder.shipping_address : "N/A" }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </base-column>
        </v-row></base-column>
    </v-row>
    <v-divider></v-divider>
    <v-row dense class="mx-2 mt-6 mb-6">
      <base-column :lg="9" :md="9" :sm="12">
        <v-row>
          <base-column :lg="3" :md="3" :sm="6">
            <v-select label="Currency" :items="CURRENCIES" v-model="PurchaseOrder.currency_id" outlined item-text="name"
              item-value="id" dense :rules="rule_currency"></v-select>
          </base-column>
          <base-column :lg="3" :md="3" :sm="6">
            <v-text-field type="number" label="Exchange Rate" outlined dense v-model="PurchaseOrder.rate"
              :rules="rule_rate"></v-text-field>
          </base-column>

          <base-column :lg="3" :md="3" :sm="6">
            <v-text-field label="Term Of Payment" disabled outlined dense v-model="PurchaseOrder.term_payment"
              readonly></v-text-field>
          </base-column>
          <base-column :lg="3" :md="3" :sm="6">
            <v-select label="Shipping Term" :items="TERM_SHIPPING" v-model="PurchaseOrder.term_shipping_id"
              item-text="name" item-value="id" outlined dense :rules="rule_shipping_term"></v-select>
          </base-column>
          <base-column :lg="3" :md="3" :sm="6">
            <v-text-field type="number" label="Discount Nominal" outlined dense readonly
              v-model="PurchaseOrder.discount_nominal" append-icon="mdi-cash"></v-text-field>
          </base-column>
          <base-column :lg="3" :md="3" :sm="6">
            <v-text-field type="number" label="Discount Percentage" outlined dense
              v-model="PurchaseOrder.discount_percent" append-icon="mdi-percent" :rules="rule_disc"></v-text-field>
          </base-column>
          <base-column :lg="3" :md="3" :sm="6">
            <v-select append-icon="mdi-percent" label="PPH" :items="PPHS" item-text="percentage" item-value="id"
              v-model="PurchaseOrder.pph_id" outlined dense :rules="rule_pph" @change="changePPH"></v-select>
          </base-column>

          <base-column :lg="3" :md="3" :sm="6">
            <v-switch dense v-model="PurchaseOrder.use_vat" label="Use VAT">
            </v-switch>
          </base-column>
        </v-row>
      </base-column>
      <base-column :lg="3" :md="3" :sm="12">
        <v-row>
          <base-column :lg="12" :md="12" :sm="12">
            <v-textarea label="Shipping Marks" outlined dense v-model="PurchaseOrder.shipping_mark" rows="4"></v-textarea>
          </base-column>
        </v-row>
      </base-column>
    </v-row>

    <v-dialog v-if="dialogPurchase" v-model="dialogPurchase" max-width="1200px" persistent>
      <purchase-modal v-on:closePurchaseDialog="closePurchaseDialog" v-on:selectPurchase="selectPurchase" />
    </v-dialog>

    <v-dialog v-if="dialogSalesOrder" v-model="dialogSalesOrder" max-width="1200px" persistent>
      <sales-order-modal v-on:closeSalesOrderDialog="closeSalesOrderDialog" v-on:selectSalesOrder="selectSalesOrder" />
    </v-dialog>

    <v-dialog v-if="dialogSupplier" v-model="dialogSupplier" max-width="1200px" persistent>
      <supplier-modal v-on:closeSupplierDialog="closeSupplierDialog" v-on:selectSupplier="selectSupplier" />
    </v-dialog>

    <v-dialog v-if="dialogShipping" v-model="dialogShipping" max-width="1200px" persistent>
      <shipping-modal v-on:closeShippingDialog="closeShippingDialog" v-on:selectCustomer="selectCustomer"
        v-on:selectWarehouse="selectWarehouse" />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
import SupplierModal from "@/components/modal/SupplierModal.vue";
import PurchaseOrderModal from "@/components/modal/PurchaseOrderModal.vue";
import ShippingModal from "@/components/modal/ShippingModal.vue";
import SalesOrderModal from '@/components/modal/SalesOrderModal.vue';

export default {
  name: "FormPurchaseOrder",

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
    this.getTermShipping();
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

    async getTermShipping() {
      await this.$axios("/term-shipping?active=1", {
        headers: {
          Authorization: this.$store.getters["auth/Token"],
        },
      }).then(({ data }) => {
        this.$store.commit(
          "term_shipping/SET_TERM_SHIPPING",
          data.term_shipping
        );
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
      this.$store.commit("purchase_order/SET_SUPPLIER", val);
    },
    selectCustomer(val) {
      this.$store.commit("purchase_order/SET_SHIPPING", val);
    },
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
    openShippingDialog() {
      this.dialogShipping = true;
    },
    closeShippingDialog() {
      this.dialogShipping = false;
    },
    changePurchaseType(val) {
      if (val === "material") {
        this.$store.commit("purchase_order/CLEAR_PRODUCT_LIST");
      } else {
        this.$store.commit("purchase_order/CLEAR_ITEM_LIST");
      }
    },

    openSalesOrderDialog() {
      this.dialogSalesOrder = true;
    },
    closeSalesOrderDialog() {
      this.dialogSalesOrder = false;
    },

    selectSalesOrder(sales_order) {
      this.$axios
        .get("/sales-order/" + sales_order.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.$store.commit("purchase_order/CLEAR_FORM");
          this.$store.commit("purchase_order/SET_PO_FORM_SO", data.sales_order);
          this.$store.commit("purchase_order/SET_DISABLED_PO_TYPE");

        })
        .catch(() => {
          this.loading = true;
        });
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
    "shipping-modal": ShippingModal,
    "sales-order-modal": SalesOrderModal,
  },
};
</script>