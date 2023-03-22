<template>
  <div>
    <v-row dense class="mx-1">
      <base-column :lg="3" :md="6" :sm="12">
        <v-text-field v-model="Quotation.quo_number" readonly placeholder="Quotation Order Number" outlined dense
          :append-icon="'mdi-magnify'" hide-details @click:append="openQuotationDialog()"></v-text-field>
      </base-column>
    </v-row>
    <!-- Referenci Number -->
    <v-divider class="my-2"></v-divider>

    <!-- Customer And Retailer Information -->
    <v-row dense class="mx-1 mt-1">
      <base-column :lg="4" :md="6" :sm="12">
        <v-card max-width="100%">
          <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
            <v-toolbar-title>
              <v-icon>mdi-account</v-icon>
              {{ Quotation.customer_name ?? "Customer" }}
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn outlined small color="primary" @click="openCustomerDialog">
              SEARCH
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-app-bar>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-subtitle>Email : {{ Quotation.customer_email ?? "N/A" }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>Phone : {{ Quotation.customer_phone ?? "N/A" }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>Address :
                {{ Quotation.customer_address ?? "N/A" }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </base-column>

      <base-column :lg="4" :md="6" :sm="12">
        <v-card max-width="100%">
          <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
            <v-toolbar-title>
              <v-icon>mdi-account</v-icon>
              {{ Quotation.retailer_name ?? "Retailer" }}
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn outlined small color="primary" @click="openRetailerDialog">
              SEARCH
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-app-bar>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-subtitle>Email : {{ Quotation.retailer_email ?? "N/A" }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>Phone : {{ Quotation.retailer_phone ?? "N/A" }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>Address :
                {{ Quotation.retailer_address ?? "N/A" }}</v-list-item-subtitle>
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
              <v-list-item-title>Name: {{ Quotation.shipping_name ?? "N/A" }}</v-list-item-title>
              <v-list-item-subtitle>Email :
                {{ Quotation.shipping_email ?? "N/A" }}</v-list-item-subtitle>
              <v-list-item-subtitle>Phone :{{ Quotation.shipping_phone ?? "N/A" }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>Address :
                {{ Quotation.shipping_address ?? "N/A" }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </base-column>
    </v-row>
    <v-divider class="mt-3"></v-divider>

    <v-row dense class="mx-1 mt-4">
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-text-field v-model="Quotation.customer_po" outlined dense label="Customer PO"></v-text-field>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-select :items="type_order" v-model="Quotation.type_order_id" dense item-text="name" item-value="id"
          label="Type Order" outlined></v-select>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-text-field v-model="Quotation.order_date" type="date" outlined dense label="Order Date"></v-text-field>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-text-field v-model="Quotation.request_date" type="date" outlined dense
          label="Request delivery Date"></v-text-field>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-text-field readonly outlined dense label="Term Of Payment" v-model="Quotation.term_payment"
          disabled></v-text-field>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-select label="Shipping Term" :items="term_shipping" v-model="Quotation.term_shipping_id" item-text="name"
          item-value="id" outlined dense></v-select>
      </base-column>

    </v-row>

    <v-row dense class="mx-1 mt-1">
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-select v-model="Quotation.currency_id" dense item-text="name" item-value="id" label="Currency" outlined
          :items="currency"></v-select>
      </base-column>

      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-text-field outlined dense label="Excange Rate" v-model="Quotation.rate"></v-text-field>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-text-field readonly outlined dense label="Discount Nominal" v-model="Quotation.discount_nominal"
          disabled></v-text-field>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="1">
        <v-text-field :rules="rule_disc" type="number" outlined dense label="Discount" append-icon="mdi-percent"
          v-model="Quotation.discount_percent"></v-text-field>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="1">
        <v-switch label="Use VAT" class="ml-3" v-model="Quotation.use_vat"></v-switch>
      </base-column>
      <base-column :xs="12" :sm="6" :md="4" :lg="2">
        <v-text-field type="number" outlined dense label="Additional Charge"
          v-model="Quotation.additional_cost"></v-text-field>
      </base-column>
    </v-row>


    <v-dialog v-if="dialogQuotations" v-model="dialogQuotations" max-width="1200px" persistent>
      <quotation-modal v-on:closeQuotationDialog="closeQuotationDialog" />
    </v-dialog>

    <v-dialog v-model="dialogCustomers" max-width="1200px" persistent>
      <customer-modal v-on:closeCustomerDialog="closeCustomerDialog" v-on:selectCustomer="selectCustomer" />
    </v-dialog>
    <v-dialog v-model="dialogRetailers" max-width="1200px" persistent>
      <retailer-modal v-on:closeRetailerDialog="closeRetailerDialog" v-on:selectRetailer="selectRetailer" />
    </v-dialog>
    <v-dialog v-model="dialogCustomerShipping" max-width="1200px" persistent>
      <customer-shipping-modal v-on:closeCustomerShippingDialog="closeCustomerShippingDialog"
        v-on:selectCustomerShipping="selectCustomerShipping" />
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
import CustomerModal from "@/components/modal/CustomerModal.vue";
import RetailerModal from "@/components/modal/RetailerModal.vue";
import CustomerShippingModal from "@/components/modal/CustomerShippingModal.vue";
import QuotationModal from "@/components/modal/QuotationModal.vue";
export default {
  name: "QuotationForm",

  data() {
    return {
      dialogQuotations: false,
      dialogCustomers: false,
      dialogCustomerShipping: false,
      dialogRetailers: false,
      currency: [],
      type_order: [],
      term_shipping: [],
    };
  },

  created() {
    this.getCurrency();
    this.getTypeOrder();
    this.getTermShipping();
  },

  methods: {
    ...mapMutations("quotation", [
      "SET_CUSTOMER",
      "SET_RETAILER",
      "SET_SHIPPING",
    ]),

    ...mapMutations("retailer", ["SET_RETAILER"]),
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
      this.$store.commit("quotation/SET_RETAILER", {
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

    openQuotationDialog() {
      this.dialogQuotations = true;
    },
    closeQuotationDialog() {
      this.dialogQuotations = false;
    },
  },

  computed: {
    ...mapState("quotation", {
      Quotation: (state) => state.quotation,
    }),
  },
  components: {
    BaseColumn,
    "quotation-modal": QuotationModal,
    "customer-modal": CustomerModal,
    "customer-shipping-modal": CustomerShippingModal,
    "retailer-modal": RetailerModal,
  },
};
</script>