<template>
  <div>

    <!-- Referenci Number -->
    <v-row dense class="mx-1 mb-4">
      <base-column :lg="3" :md="6" :sm="12">
        <v-progress-linear indeterminate color="primary" :active="loading"></v-progress-linear>
        <v-text-field readonly placeholder="Purchase Order Number" outlined dense :append-icon="'mdi-magnify'"
          hide-details v-model="PurchaseShipping.po_number" @click:append="openPurchaseOrderDialog()"></v-text-field>
      </base-column>
    </v-row>
    <!-- Referenci Number -->
    <v-divider></v-divider>
    <v-row dense class="mx-2 mt-6 mb-6">
      <base-column :lg="3" :md="6" :sm="12">
        <base-column :lg="12" :md="12" :sm="12">
          <v-text-field label="Date Register Shipping" type="date" outlined dense v-model="PurchaseShipping.request_date"
            :rules="rule_request_date"></v-text-field>
        </base-column>
      </base-column>
      <base-column :lg="9" :md="9" :sm="12">
        <v-row>
          <base-column :lg="4" :md="4" :sm="12">
            <v-card>
              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                <v-toolbar-title>
                  <v-icon>mdi-account</v-icon>
                  Supplier
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-app-bar>
              <v-list-item three-line v-if="PurchaseShipping.supplier_id">
                <v-list-item-content>
                  <v-list-item-title>{{
                    PurchaseShipping.supplier_name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ PurchaseShipping.supplier_phone ? PurchaseShipping.supplier_phone : "N/A" }} |
                    {{ PurchaseShipping.supplier_email ? PurchaseShipping.supplier_email : "N/A" }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ PurchaseShipping.supplier_address ? PurchaseShipping.supplier_address : "N/A" }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </base-column>
          <base-column :lg="4" :md="4" :sm="12">
            <v-card>
              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                <v-toolbar-title>
                  <v-icon>mdi-map-marker</v-icon>
                  Shipping Address
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-app-bar>
              <v-list-item three-line v-if="PurchaseShipping.shipping_address">
                <v-list-item-content>
                  <v-list-item-subtitle>
                    {{
                      PurchaseShipping.shipping_name ? PurchaseShipping.shipping_name : "N/A"
                    }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{
                      PurchaseShipping.shipping_emailz ? PurchaseShipping.shipping_emailz : "N/A"
                    }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ PurchaseShipping.shipping_address ? PurchaseShipping.shipping_address : "N/A" }}
                  </v-list-item-subtitle>

                </v-list-item-content>
              </v-list-item>
            </v-card>
          </base-column>
          <base-column :lg="4" :md="4" :sm="12">
            <v-row>
              <base-column :lg="12" :md="12" :sm="12">
                <v-textarea readonly disabled label="Shipping Marks" outlined dense
                  v-model="PurchaseShipping.shipping_mark" rows="4"></v-textarea>
              </base-column>
            </v-row>
          </base-column> </v-row></base-column>
    </v-row>
    <v-divider></v-divider>
    <v-row dense class="mx-2 mt-6 mb-6">
      <base-column :lg="3" :md="3" :sm="12">
        <v-row>
          <base-column :lg="12" :md="12" :sm="12">
            <v-textarea label="Notes" outlined dense v-model="PurchaseShipping.note" rows="4"></v-textarea>
          </base-column>
        </v-row>
      </base-column>
      <base-column :lg="6" :md="9" :sm="12">
        <v-row>
          <base-column :lg="3" :md="3" :sm="6">
            <v-select readonly label="Currency" :items="CURRENCIES" disabled v-model="PurchaseShipping.currency_id"
              outlined item-text="name" item-value="id" dense :rules="rule_currency"></v-select>
          </base-column>
          <base-column :lg="3" :md="3" :sm="6">
            <v-text-field type="number" label="Exchange Rate" outlined readonly disabled dense
              v-model="PurchaseShipping.rate" :rules="rule_rate"></v-text-field>
          </base-column>

          <base-column :lg="3" :md="3" :sm="6">
            <v-text-field label="Term Of Payment" disabled readonly outlined dense
              v-model="PurchaseShipping.term_payment"></v-text-field>
          </base-column>
          <base-column :lg="3" :md="3" :sm="6">
            <v-select readonly disabled label="Shipping Term" :items="TERM_SHIPPING"
              v-model="PurchaseShipping.term_shipping_id" item-text="name" item-value="id" outlined dense
              :rules="rule_shipping_term"></v-select>
          </base-column>

          <base-column :lg="3" :md="3" :sm="6">
            <v-select readonly append-icon="mdi-percent" label="PPH" disabled :items="PPHS" item-text="percentage"
              item-value="id" v-model="PurchaseShipping.pph_id" outlined dense :rules="rule_ps_pph"></v-select>
          </base-column>
          <base-column :lg="3" :md="3" :sm="6">
            <v-text-field type="number" label="Discount Percentage" disabled outlined dense readonly
              v-model="PurchaseShipping.discount_percent" append-icon="mdi-percent" :rules="rule_disc"></v-text-field>
          </base-column>

          <base-column :lg="3" :md="3" :sm="6">
            <v-switch dense disabled v-model="PurchaseShipping.use_vat" label="Use VAT">
            </v-switch>
          </base-column>
        </v-row>
      </base-column>
    </v-row>

    <v-dialog v-model="dialogPurchase" max-width="1200px" persistent>
      <purchase-modal v-on:closePurchaseDialog="closePurchaseDialog" v-on:selectPurchase="selectPurchase" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
import PurchaseOrderModal from "@/components/modal/PurchaseOrderBalance.vue";
export default {
  name: "FormPurchaseOrder",

  data() {
    return {
      loading: false,
      dialogSalesOrder: false,
      dialogPurchase: false,
      dialogSupplier: false,
      dialogShipping: false,
      rule_disc: [
        (v) => v >= 0 || "Discount cannot be below 0",
        (v) => v <= 100 || "Discount must not be above 100",
      ],
      rule_ps_rate: [(v) => v >= 0 || " Rate cannot be below 0"],
      rule_ps_request_date: [(v) => !!v || " Request Date is required"],
      rule_ps_currency: [(v) => !!v || "Currency is required"],
      rule_ps_payment_term: [(v) => !!v || "Payment term is required"],
      rule_ps_shipping_term: [(v) => !!v || "Shipping term is required"],
      rule_ps_pph: [(v) => !!v || "PPh is required"],
    };
  },

  created() {
    this.getPph();
    this.getCurrency();
    this.getTermShipping();
  },
  methods: {
    ...mapMutations("purchase_shipping", ["CLEAR_STATE", "SET_SHP_FROM_PO"]),
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

    async selectPurchase(purchase_order) {

      this.loading = true;
      this.CLEAR_STATE();
      await this.$axios
        .get("/purchase-order/" + purchase_order.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_SHP_FROM_PO(data.purchase_orders);
          this.loading = false;
        })
        .catch(() => {
          this.loading = true;
        });

    },
    openPurchaseOrderDialog() {
      this.dialogPurchase = true;
    },
    closePurchaseDialog() {
      this.dialogPurchase = false;
    },
  },
  computed: {
    ...mapGetters("purchase_shipping", {
      PurchaseShipping: "PurchaseShipping"
    }),
    ...mapGetters("pph", {
      PPHS: "Pphs",
    }),
    ...mapGetters("currency", {
      CURRENCIES: "Currencies",
    }),

    ...mapGetters("term_shipping", {
      TERM_SHIPPING: "TermShipping",
    }),
  },


  components: {
    BaseColumn,
    "purchase-modal": PurchaseOrderModal,
  },
};
</script>