<template>
      <div>
            <v-row dense class="mx-1">
                  <base-column :lg="3" :md="6" :sm="12">
                        <v-text-field v-model="SalesOrder.quo_number" readonly placeholder=" Quotation  Number" outlined
                              dense :append-icon="'mdi-magnify'" hide-details></v-text-field>
                  </base-column>
                  <base-column :lg="3" :md="6" :sm="12">
                        <v-progress-linear indeterminate color="primary" :active="load_sales_order"></v-progress-linear>
                        <v-text-field v-model="SalesOrder.so_number" readonly placeholder=" Sales Order Number" outlined
                              dense :append-icon="'mdi-magnify'" hide-details @click:append="openSalesOrderDialog()"
                              :disabled="disable_sales_order"></v-text-field>
                  </base-column>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row dense class="mx-1 mt-1">
                  <base-column :lg="4" :md="6" :sm="12">
                        <v-card max-width="100%">
                              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                                    <v-toolbar-title>
                                          <v-icon>mdi-account</v-icon>
                                          {{ SalesOrder.customer_name ?? "Customer" }}
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>

                                    <v-btn outlined small color="primary" @click="openCustomerDialog">
                                          SEARCH
                                          <v-icon>mdi-magnify</v-icon>
                                    </v-btn>
                              </v-app-bar>
                              <v-list-item three-line>
                                    <v-list-item-content>
                                          <v-list-item-subtitle>Email : {{ SalesOrder.customer_email ?? "N/A" }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Phone : {{ SalesOrder.customer_phone ?? "N/A" }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Address :
                                                {{ SalesOrder.customer_address ?? "N/A" }}</v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                        </v-card>
                  </base-column>
                  <base-column :lg="4" :md="6" :sm="12">
                        <v-card max-width="100%">
                              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                                    <v-toolbar-title>
                                          <v-icon>mdi-account</v-icon>
                                          {{ SalesOrder.retailer_name ?? "Retailer" }}
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>

                                    <v-btn outlined small color="primary" @click="openRetailerDialog">
                                          SEARCH
                                          <v-icon>mdi-magnify</v-icon>
                                    </v-btn>
                              </v-app-bar>
                              <v-list-item three-line>
                                    <v-list-item-content>
                                          <v-list-item-subtitle>Email : {{ SalesOrder.retailer_email ?? "N/A" }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Phone : {{ SalesOrder.retailer_phone ?? "N/A" }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Address :
                                                {{ SalesOrder.retailer_address ?? "N/A" }}</v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                        </v-card>
                  </base-column>
                  <base-column :lg="4" :md="6" :sm="12">
                        <v-card max-width="100%">
                              <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                                    <v-toolbar-title>
                                          <v-icon>mdi-truck-delivery</v-icon>
                                          Shipping Address :
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>

                                    <v-btn outlined small color="primary" @click="openCustomerShippingDialog">
                                          SEARCH
                                          <v-icon>mdi-magnify</v-icon>
                                    </v-btn>
                              </v-app-bar>
                              <v-list-item three-line>
                                    <v-list-item-content>
                                          <v-list-item-title>Name: {{
                                                SalesOrder.shipping_name ?? "N/A"
                                          }}</v-list-item-title>
                                          <v-list-item-subtitle>Email :
                                                {{ SalesOrder.shipping_email ?? "N/A" }}</v-list-item-subtitle>
                                          <v-list-item-subtitle>Phone :{{ SalesOrder.shipping_phone ?? "N/A" }}
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>Address :
                                                {{ SalesOrder.shipping_address ?? "N/A" }}</v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                        </v-card>
                  </base-column>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row dense class="mx-1 mt-4">
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field v-model="SalesOrder.customer_po" outlined dense
                              label="Customer PO"></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-select :items="type_order" v-model="SalesOrder.type_order_id" dense item-text="name"
                              item-value="id" label="Type Order" outlined></v-select>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field v-model="SalesOrder.order_date" type="date" outlined dense
                              label="Order Date"></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field v-model="SalesOrder.request_date" type="date" outlined dense
                              label="Request delivery Date"></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field readonly outlined dense label="Term Of Payment" v-model="SalesOrder.term_payment"
                              disabled></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-select label="Shipping Term" :items="term_shipping" v-model="SalesOrder.term_shipping_id"
                              item-text="name" item-value="id" outlined dense></v-select>
                  </base-column>

            </v-row>

            <v-row dense class="mx-1 mt-1">
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-select v-model="SalesOrder.currency_id" dense item-text="name" item-value="id"
                              label="Currency" outlined :items="currency"></v-select>
                  </base-column>

                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field outlined dense label="Excange Rate" v-model="SalesOrder.rate"></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field readonly outlined dense label="Discount Nominal" v-model="SalesOrder.discount"
                              disabled></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="1">
                        <v-text-field :rules="rule_disc" type="number" outlined dense label="Discount"
                              append-icon="mdi-percent" v-model="SalesOrder.discount_percent"></v-text-field>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="1">
                        <v-switch label="Use VAT" class="ml-3" v-model="SalesOrder.use_vat"></v-switch>
                  </base-column>
                  <base-column :xs="12" :sm="6" :md="4" :lg="2">
                        <v-text-field type="number" outlined dense label="Additional Charge"
                              v-model="SalesOrder.additional_cost"></v-text-field>
                  </base-column>
            </v-row>


            <!-- <v-dialog v-if="dialogQuotations" v-model="dialogQuotations" max-width="1200px" persistent>
                  <quotation-modal v-on:closeQuotationDialog="closeQuotationDialog" />
            </v-dialog> -->
            <v-dialog v-if="dialogCustomers" v-model="dialogCustomers" max-width="1200px" persistent>
                  <customer-modal v-on:closeCustomerDialog="closeCustomerDialog" v-on:selectCustomer="selectCustomer" />
            </v-dialog>
            <v-dialog v-if="dialogRetailers" v-model="dialogRetailers" max-width="1200px" persistent>
                  <retailer-modal v-on:closeRetailerDialog="closeRetailerDialog" v-on:selectRetailer="selectRetailer" />
            </v-dialog>
            <v-dialog v-if="dialogCustomerShipping" v-model="dialogCustomerShipping" max-width="1200px" persistent>
                  <customer-shipping-modal v-on:closeCustomerShippingDialog="closeCustomerShippingDialog"
                        v-on:selectCustomerShipping="selectCustomerShipping" />
            </v-dialog>
            <v-dialog v-if="dialogSalesOrder" v-model="dialogSalesOrder" max-width="1200px" persistent>
                  <sales-order-modal v-on:closeSalesOrderDialog="closeSalesOrderDialog"
                        v-on:selectSalesOrder="selectSalesOrder" />
            </v-dialog>
      </div>
</template>

<script>
import BaseColumn from '@/components/base/BaseColumn.vue';
import { mapState, mapMutations } from 'vuex';
import SalesOrderModal from '@/components/modal/SalesOrderModal.vue';
import CustomerModal from '@/components/modal/CustomerModal.vue';
import RetailerModal from '@/components/modal/RetailerModal.vue';
import CustomerShippingModal from '@/components/modal/CustomerShippingModal.vue';
export default {
      name: "SalesOrderForm",
      data() {
            return {
                  dialogQuotation: false,
                  dialogSalesOrder: false,
                  dialogCustomers: false,
                  dialogRetailers: false,
                  dialogCustomerShipping: false,
                  currency: [],
                  type_order: [],
                  term_shipping: [],
                  load_sales_order: false,
                  disable_sales_order: false,
            };
      },
      created() {
            this.getCurrency();
            this.getTypeOrder();
            this.getTermShipping();
      },

      methods: {
            ...mapMutations("sales_order", [
                  "SET_SALES_ORDER",
                  "SET_CUSTOMER",
                  "SET_RETAILER",
                  "SET_SHIPPING",
            ]),
            async getCurrency() {
                  await this.$axios("/currency?active=1", {
                        headers: {
                              Authorization: this.$store.getters["auth/Token"],
                        },
                  }).then(({ data }) => {
                        this.currency = data.currency;
                        this.loading = false;
                  });
            },

            async getTypeOrder() {
                  await this.$axios("/type-order?active=1", {
                        headers: {
                              Authorization: this.$store.getters["auth/Token"],
                        },
                  }).then(({ data }) => {
                        this.type_order = data.type_order;
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
            openCustomerDialog() {
                  this.dialogCustomers = true;
            },
            closeCustomerDialog() {
                  this.dialogCustomers = false;
            },
            selectCustomer(val) {
                  this.SET_CUSTOMER({
                        id: val.id,
                        name: val.name,
                        phone: val.phone,
                        email: val.email,
                        address: val.address,
                        term_payment: val.term_payment,
                  });
                  this.dialogCustomers = false;
            },

            openRetailerDialog() {
                  this.dialogRetailers = true;
            },
            closeRetailerDialog() {
                  this.dialogRetailers = false;
            },
            selectRetailer(val) {
                  if (this.SalesOrder.retailer_id !== val.id) {
                        this.$store.commit("sales_order/CLEAR_PRODUCT_LIST");
                  }
                  this.$store.commit("sales_order/SET_RETAILER", {
                        id: val.id,
                        name: val.name,
                        phone: val.phone,
                        email: val.email,
                        address: val.address,
                  });
                  this.$store.commit("retailer/SET_RETAILER", {
                        id: val.id,
                        name: val.name,
                        phone: val.phone,
                        email: val.email,
                        address: val.address,
                  });
                  this.dialogRetailers = false;
            },
            openCustomerShippingDialog() {
                  this.dialogCustomerShipping = true;
            },
            closeCustomerShippingDialog() {
                  this.dialogCustomerShipping = false;
            },
            selectCustomerShipping(val) {
                  this.SET_SHIPPING({
                        name: val.name,
                        phone: val.phone,
                        email: val.email,
                        address: val.address,
                  });
                  this.dialogCustomerShipping = false;
            },

            openSalesOrderDialog() {
                  this.dialogSalesOrder = true;
            },
            closeSalesOrderDialog() {
                  this.dialogSalesOrder = false;
            },

            selectSalesOrder(sales_order) {
                  this.load_sales_order = true;
                  this.$axios
                        .get("/sales-order/" + sales_order.id, {
                              headers: {
                                    Authorization: this.$store.getters["auth/Token"],
                              },
                        })
                        .then(({ data }) => {
                              const path = '/sales-order/edit';
                              this.SET_SALES_ORDER(data.sales_order);
                              this.load_sales_order = false;
                              if (this.$route.path !== path) this.$router.push(path)
                        })
                        .catch(() => {
                              this.load_sales_order = true;
                        });
            },
      },
      computed: {
            ...mapState("sales_order", {
                  SalesOrder: (state) => state.sales_order,
            }),
      },

      components: {
            BaseColumn,
            CustomerModal,
            RetailerModal,
            CustomerShippingModal,
            SalesOrderModal,
      },
}
</script>