<template>
  <div>
    <v-data-table :loading="loading" :headers="headers" :items="CUSTOMER.data" class="elevation-1" show-expand
      :expanded.sync="expanded" :single-expand="true" @click:row="dataTableRowClicked" hide-default-footer>
      <template v-slot:[`item.is_active`]="{ item }">
        <v-icon v-if="item.is_active == 1" color="success">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
      </template>
      <template v-slot:no-data> No data </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col cols="12" class="mt-5">
              <h4 class="mb-3">
                Address :
                {{ item.address ? item.address : "N/A" }}
              </h4>
              <hr />
              <h4 class="mb-1">
                Term Of Payment :
                {{ item.term_payment.name ? item.term_payment.name : "N/A" }}
              </h4>
            </v-col>
          </v-row>
        </td>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="warning" class="mr-2" @click.stop="edit(item)">
          mdi-pencil-box-outline
        </v-icon>
      </template>

      <template v-slot:top>
        <v-toolbar flat color="white">
          <base-column :lg="4" :md="4" :sm="6">
            <v-text-field v-model="search.keyword" append-icon="mdi-magnify" label="Search Data" outlined dense
              hide-details></v-text-field>
          </base-column>
          <base-column :lg="2" :md="2" :sm="6">
            <v-select class="mt-6" :items="status" outlined dense attach chips label="Status"
              v-model="search.status"></v-select></base-column>
          <v-btn small color="darkblue" class="white--text float-end mx-1" @click.stop="searching">Submit <v-icon
              right>mdi-magnify</v-icon></v-btn>
          <v-btn small color="secondary" class="white--text float-end mx-1" @click.stop="clear">Clear
            <v-icon right>mdi-close-circle-multiple </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10" :disabled="disabled"></v-pagination>
  </div>
</template>

<script>
import BaseColumn from "@/components/base/BaseColumn";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CustomerList",
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
        status: null,
        keyword: null,
      },
      expanded: [],
    };
  },

  created() {
    this.getCustomer();
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
        status: "",
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

    edit(item) {
      this.$router.push("/master/customers/edit/" + item.id);
    },
  },
  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.getCustomer();
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
