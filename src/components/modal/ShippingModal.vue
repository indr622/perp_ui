<template>
  <v-card>
    <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
      <v-toolbar-title>Shipping Address </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeShippingDialog" color="error" outlined small>
        <v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>
    <v-tabs>
      <v-tab href="#customer"> Customer List </v-tab>
      <v-tab-item value="customer">
        <v-card>
          <v-data-table :loading="loading" :headers="customer_headers" :items="CUSTOMERS.data" class="elevation-1"
            hide-default-footer>
            <template v-slot:no-data> No data </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" outlined small @click.stop="selectCustomer(item)">Select <v-icon right> mdi-check
                </v-icon></v-btn>
            </template>

            <template v-slot:[`item.is_active`]="{ item }">
              <v-icon v-if="item.is_active == 1" color="success">
                mdi-check-circle
              </v-icon>
              <v-icon v-else color="error"> mdi-close-circle </v-icon>
            </template>
            <template v-slot:top>
              <v-toolbar flat color="white">
                <base-column :lg="4" :md="4" :sm="6">
                  <v-text-field v-model="search_customer.keyword" append-icon="mdi-magnify" label="Search Data" outlined
                    dense hide-details></v-text-field>
                </base-column>

                <v-btn small color="darkblue" class="white--text float-end mx-1" @click.stop="load_customer">Submit
                  <v-icon right>mdi-magnify</v-icon></v-btn>
                <v-btn small color="secondary" class="white--text float-end mx-1" @click.stop="clear">Clear
                  <v-icon right>mdi-close-circle-multiple </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-pagination v-model="currentPageCustomer" :length="lastPageCustomer" :total-visible="10"
            :disabled="disabled"></v-pagination>
        </v-card>
      </v-tab-item>
      <v-tab href="#warehouse"> Warehouse List </v-tab>
      <v-tab-item value="warehouse">
        <v-card>
          <v-data-table :loading="loading" :headers="customer_headers" :items="WAREHOUSE.data" class="elevation-1"
            hide-default-footer>
            <template v-slot:no-data> No data </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" outlined small @click.stop="selectWarehouse(item)">Select <v-icon right> mdi-check
                </v-icon></v-btn>
            </template>

            <template v-slot:[`item.is_active`]="{ item }">
              <v-icon v-if="item.is_active == 1" color="success">
                mdi-check-circle
              </v-icon>
              <v-icon v-else color="error"> mdi-close-circle </v-icon>
            </template>
            <template v-slot:top>
              <v-toolbar flat color="white">
                <base-column :lg="4" :md="4" :sm="6">
                  <v-text-field v-model="search_warehouse.keyword" append-icon="mdi-magnify" label="Search Data"
                    outlined dense hide-details></v-text-field>
                </base-column>

                <v-btn small color="darkblue" class="white--text float-end mx-1" @click.stop="load_warehouse">Submit
                  <v-icon right>mdi-magnify</v-icon></v-btn>
                <v-btn small color="secondary" class="white--text float-end mx-1" @click.stop="clear">Clear
                  <v-icon right>mdi-close-circle-multiple </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-pagination v-model="currentPageWarehouse" :length="lastPageWarehouse" :total-visible="10"
            :disabled="disabled"></v-pagination> </v-card></v-tab-item>
    </v-tabs>
  </v-card>
</template>


<script>
import { mapGetters } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
export default {
  name: "ShippingModal",
  data() {
    return {
      customer_headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Address", value: "address" },
        { text: "Status", value: "is_active" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      warehouse_headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Address", value: "address" },
        { text: "Status", value: "is_active" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      page_customer: 1,
      page_warehouse: 1,
      disabled: false,
      loading: false,
      search_customer: {
        keyword: null,
        status: "Active",
      },
      search_warehouse: {
        keyword: null,
        status: "Active",
      },
    };
  },

  created() {
    this.getCustomer();
    this.getWarehouse();
  },
  methods: {
    closeShippingDialog() {
      this.$emit("closeShippingDialog");
    },

    selectCustomer(item) {
      this.$emit("selectCustomer", item);
      this.closeShippingDialog();
    },

    selectWarehouse(item) {
      this.$emit("selectWarehouse", item);
      this.closeShippingDialog();
    },

    async getCustomer() {
      this.loading = true;
      this.disabled = true;
      let params = {
        page: this.page_customer,
        status: this.search_customer.status,
        keyword: this.search_customer.keyword,
      };

      await this.$axios
        .get("/customer", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.$store.commit("customer/SET_CUSTOMERS", data.customers);
          this.loading = false;
          this.disabled = false;
        });
    },
    async getWarehouse() {
      this.loading = true;
      this.disabled = true;
      let params = {
        page: this.page_warehouse,
        status: this.search_warehouse.status,
        keyword: this.search_warehouse.keyword,
      };

      await this.$axios
        .get("/warehouse", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.$store.commit("warehouse/SET_WAREHOUSE", data.warehouse);
          this.loading = false;
          this.disabled = false;
        });
    },

    load_customer() {
      this.page_customer = 1;
      this.getCustomer();
    },
    load_warehouse() {
      this.page_warehouse = 1;
      this.getWarehouse();
    },
    clear() {
      this.page_customer = 1;
      this.search_customer = {
        status: "",
        search: "",
      };
      this.getCustomer();
    },
  },
  watch: {
    currentPageCustomer(newValue) {
      this.page_customer = newValue;
      this.getCustomer();
    },
    currentPageWarehouse(newValue) {
      this.page_warehouse = newValue;
      this.getWarehouse();
    },
  },

  computed: {
    ...mapGetters("customer", {
      CUSTOMERS: "Customers",
    }),
    ...mapGetters("warehouse", {
      WAREHOUSE: "Warehouse",
    }),
    currentPageWarehouse: {
      get() {
        return this.WAREHOUSE.current_page;
      },
      set(val) {
        return this.$store.commit("warehouse/SET_CURRENT_PAGE", val);
      },
    },
    currentPageCustomer: {
      get() {
        return this.CUSTOMERS.current_page;
      },
      set(val) {
        return this.$store.commit("customer/SET_CURRENT_PAGE", val);
      },
    },
    lastPageCustomer: {
      get() {
        return this.CUSTOMERS.last_page;
      },
    },
    lastPageWarehouse: {
      get() {
        return this.WAREHOUSE.last_page;
      },
    },
  },
  destroyed() {
    this.$store.commit("customer/CLEAR_STATE");
    this.$store.commit("warehouse/CLEAR_STATE");
  },
  components: {
    BaseColumn,
  },
};
</script>