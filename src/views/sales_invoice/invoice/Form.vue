<template>
      <div>
            <v-row dense class="mx-1">
                  <base-column :lg="3" :md="6" :sm="12">
                        <v-text-field readonly placeholder="Sales Order Number" outlined dense
                              v-model="SalesInvoice.so_number" :append-icon="'mdi-magnify'" hide-details
                              @click:append="openSalesOrderDialog()"></v-text-field>
                  </base-column>
                  <base-column :lg="3" :md="6" :sm="12">
                        <v-text-field readonly placeholder="Purchase Order Number" disabled outlined dense
                              v-model="SalesInvoice.po_number"></v-text-field>
                  </base-column>
                  <base-column :lg="3" :md="6" :sm="12">
                        <v-text-field readonly placeholder="Shipping Intruction Number" outlined dense
                              v-model="SalesInvoice.shp_number" :append-icon="'mdi-magnify'"
                              hide-details></v-text-field>
                  </base-column>
            </v-row>
            <v-divider class=" my-4"></v-divider>
            <v-row dense class="mx-1 mt-1">
                  <base-column :lg="3" :md="6" :sm="12">
                        <v-row dense class="mx-1 mt-1">
                              <base-column :lg="12" :md="12" :sm="12">
                                    <v-select :items="InvoiceStatus" label="Sales Invoice Status" outlined dense
                                          item-text="name" :rules="rule_status"
                                          v-model="SalesInvoice.status"></v-select>
                              </base-column>
                              <base-column :lg="12" :md="12" :sm="12">
                                    <v-text-field readonly disabled label="Order Date" v-model="SalesInvoice.order_date"
                                          type="date" outlined dense :rules="rule_order_date"></v-text-field>
                              </base-column>
                        </v-row>
                  </base-column>

                  <base-column :lg="3" :md="6" :sm="12">
                        <v-row dense class="mx-1 mt-1">
                              <base-column :lg="12" :md="12" :sm="12">
                                    <v-text-field label="Delivery Date" v-model="SalesInvoice.delivery_date" type="date"
                                          outlined dense :rules="rule_order_date"></v-text-field>
                              </base-column>
                              <base-column :lg="12" :md="12" :sm="12">
                                    <v-text-field label="Invoice Date" type="date" outlined dense
                                          v-model="SalesInvoice.invoice_date" :rules="rule_request_date"></v-text-field>
                              </base-column>
                        </v-row>
                  </base-column>

                  <base-column :lg="3" :md="6" :sm="12">
                        <v-card max-width="100%">
                              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                                    <v-toolbar-title>
                                          <v-icon>mdi-account</v-icon>
                                          Customer
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>
                              </v-app-bar>
                              <v-list-item three-line>
                                    <v-list-item-content>
                                          <v-list-item-title>Name: {{ SalesInvoice.customer_name }}
                                          </v-list-item-title>
                                          <v-list-item-subtitle>Email :{{
                                                SalesInvoice.customer_email
                                          }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Phone :{{
                                                SalesInvoice.customer_phone
                                          }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Address :{{
                                                SalesInvoice.customer_address
                                          }}
                                          </v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                        </v-card>
                  </base-column>

                  <base-column :lg="3" :md="6" :sm="12">
                        <v-card max-width="100%">
                              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                                    <v-toolbar-title>
                                          <v-icon>mdi-truck-delivery</v-icon>
                                          Delivery To
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>
                              </v-app-bar>
                              <v-list-item three-line>
                                    <v-list-item-content>
                                          <v-list-item-title>Name: {{
                                                SalesInvoice.shipping_name
                                          }}</v-list-item-title>
                                          <v-list-item-subtitle>Email :{{
                                                SalesInvoice.shipping_name
                                          }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Phone :{{
                                                SalesInvoice.shipping_name
                                          }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Address :{{
                                                SalesInvoice.shipping_name
                                          }}
                                          </v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                        </v-card>
                  </base-column>

            </v-row>
            <v-divider class="mt-3"></v-divider>

            <v-row dense class="mx-1 mt-1">
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field label="Document Number" v-model="SalesInvoice.document_no" outlined
                              dense></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-select label="Currency" readonly disabled :items="CURRENCIES"
                              v-model="SalesInvoice.currency_id" outlined item-text="name" item-value="id" dense
                              :rules="rule_currency"></v-select>
                  </base-column>

                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field outlined disabled readonly dense v-model="SalesInvoice.currency_id"
                              label="Excange Rate"></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field v-model="SalesInvoice.discount" readonly outlined dense label="Discount Nominal"
                              disabled></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="1">
                        <v-text-field :rules="rule_disc" type="number" readonly disabled
                              v-model="SalesInvoice.discount_percent" outlined dense label="Discount"
                              append-icon="mdi-percent"></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="1">
                        <v-switch label="Use VAT" v-model="SalesInvoice.use_vat" class="ml-3" readonly></v-switch>
                  </base-column>

            </v-row>

            <v-row dense class="mx-1 mt-1">
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field readonly outlined dense label="Term Of Payment"
                              v-model="SalesInvoice.term_payment" disabled></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-select label="Shipping Term" :items="term_shipping" v-model="SalesInvoice.term_shipping_id"
                              item-text="name" item-value="id" outlined dense disabled readonly></v-select>
                  </base-column>

            </v-row>

            <v-dialog v-if="dialogSalesOrder" v-model="dialogSalesOrder" max-width="1200px" persistent>
                  <sales-order-modal v-on:closeSalesOrderDialog="closeSalesOrderDialog"
                        v-on:selectSalesOrder="selectSalesOrder" />
            </v-dialog>

            <v-dialog v-if="dialogPurchaseShipping" v-model="dialogPurchaseShipping" max-width="1200px" persistent>
                  <purchase-shipping-modal v-on:closePurchaseShipping="closePurchaseShipping"
                        v-on:selectPurchaseShipping="selectPurchaseShipping" />
            </v-dialog>

      </div>
</template>

<script>
import BaseColumn from '@/components/base/BaseColumn.vue';
import SalesOrderModal from '@/components/modal/SalesOrderModal.vue';
import PurchaseShippingModal from '@/components/modal/PurchaseShippingModal.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
      name: "SalesInvoiceForm",
      data() {
            return {
                  dialogSalesOrder: false,
                  dialogPurchaseShipping: false,
                  currency: [],
                  type_order: [],
                  term_shipping: [],
            };
      },

      created() {
            this.getCurrency();
            this.getTermShipping();
      },
      methods: {
            ...mapMutations("sales_invoice", ["SET_FROM_SHP", "SET_FROM_SO", "SET_SALES_INVOICE"]),

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
                        this.term_shipping = data.term_shipping;
                  });
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
                              this.SET_FROM_SO(data.sales_order);
                        })
                        .catch((e) => {
                              alert(e);
                        });
            },

            openPurchaseShippingDialog() {
                  this.dialogPurchaseShipping = true;
            },
            closePurchaseShipping() {
                  this.dialogPurchaseShipping = false;
            },
            selectPurchaseShipping(purchase_shipping) {
                  console.log(purchase_shipping);
                  this.$axios
                        .get("/purchase-shipping/" + purchase_shipping.id, {
                              headers: {
                                    Authorization: this.$store.getters["auth/Token"],
                              },
                        })
                        .then(({ data }) => {
                              this.SET_FROM_SHP(data.purchase_shipping);
                        })
                        .catch((e) => {
                              alert(e);
                        });
            },
      },

      computed: {
            ...mapState("sales_invoice", {
                  SalesInvoice: (state) => state.sales_invoice,
            }),
            ...mapGetters("sales_invoice", {
                  InvoiceStatus: "InvoiceStatus",
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
            "sales-order-modal": SalesOrderModal,
            "purchase-shipping-modal": PurchaseShippingModal,
      },

};
</script>