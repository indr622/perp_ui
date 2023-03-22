<template>
  <v-card>
    <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
      <v-toolbar-title> Customers List </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeCustomerShippingDialog" color="error" outlined small>
        <v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>

    <v-data-table :loading="loading" :headers="headers" :items="CUSTOMER.data" class="elevation-1" show-expand
      :expanded.sync="expanded" :single-expand="true" @click:row="dataTableRowClicked" hide-default-footer>
      <template v-slot:no-data> No data </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" outlined small @click.stop="selectCustomerShipping(item)">Select <v-icon right> mdi-check
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
          <base-column :lg="6" :md="6" :sm="12">
            <v-text-field v-model="search.keyword" append-icon="mdi-magnify" label="Search Data" outlined dense
              hide-details></v-text-field></base-column>

          <v-btn small color="darkblue" class="white--text float-end mx-1" @click.stop="getCustomer">Submit <v-icon
              right>mdi-magnify</v-icon></v-btn>
          <v-btn small color="secondary" class="white--text float-end mx-1" @click.stop="clear">Clear
            <v-icon right>mdi-close-circle-multiple </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template>
        <v-icon color="warning" class="mr-2"> mdi-pencil-box-outline </v-icon>
      </template>
    </v-data-table>

    <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10" :disabled="disabled"></v-pagination>
  </v-card>
</template>

<script>
import BaseColumn from "@/components/base/BaseColumn";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CustomerShippingModal",

  created() {
    this.getCustomer();
  },

  data() {
    return {
      headers: [
        { text: "Customers Name", value: "name" },
        { text: "Owner", value: "owner" },
        { text: "Phone", value: "phone" },
        { text: "Email", value: "email" },
        { text: "PIC", value: "pic_name" },
        { text: "Status", value: "is_active" },
        { text: "Action", value: "actions", sortable: false, width: 100 },
      ],
      page: 1,
      disabled: false,
      loading: false,
      status: ["Active", "Inactive"],
      search: {
        status: "Active",
        keyword: null,
      },
      expanded: [],
    };
  },
  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.getCustomer();
    },
  },

  methods: {
    ...mapMutations("customer", ["SET_CUSTOMERS", "CLEAR_CUSTOMERS"]),
    async getCustomer() {
      this.loading = true;
      this.disabled = true;
      let params = {
        page: this.page,
        status: this.search.status,
        keyword: this.search.keyword,
      };

      await this.$axios
        .get("/customer", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_CUSTOMERS(data.customers);
          this.loading = false;
          this.disabled = false;
        });
    },

    searching() {
      this.page = 1;
      this.getCustomer();
    },
    clear() {
      this.page = 1;
      this.search = {
        status: "Active",
        search: "",
      };
      this.getCustomer();
    },

    dataTableRowClicked(item) {
      if (item === this.expanded[0]) {
        this.expanded = [];
      } else {
        this.expanded = [item];
      }
    },
    closeCustomerShippingDialog() {
      this.$emit("closeCustomerShippingDialog");
    },

    selectCustomerShipping(item) {
      this.$emit("selectCustomerShipping", item);
      this.closeCustomerShippingDialog();
    },
  },

  computed: {
    ...mapGetters("customer", {
      CUSTOMER: "Customers",
    }),

    currentPage: {
      get() {
        return this.CUSTOMER.current_page;
      },
      set(val) {
        return this.$store.commit("customer/SET_CURRENT_PAGE", val);
      },
    },
    lastPage: {
      get() {
        return this.CUSTOMER.last_page;
      },
    },
  },

  destroyed() {
    this.CLEAR_CUSTOMERS();
  },
  components: {
    BaseColumn,
  },
};
</script>