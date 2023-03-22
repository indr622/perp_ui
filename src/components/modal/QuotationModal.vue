<template>
  <v-card>
    <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
      <v-toolbar-title> QUotation List </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeQuotationDialog" color="error" outlined small>
        <v-icon>mdi-close</v-icon></v-btn
      >
    </v-app-bar>
    <v-row class="mx-1 mb-1">
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-text-field
          type="date"
          label="From date"
          outlined
          dense
          v-model="search.from_date"
        >
        </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-text-field
          type="date"
          label="End date"
          outlined
          dense
          v-model="search.end_date"
        >
        </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-select
          :items="status"
          outlined
          dense
          attach
          chips
          label="Status"
          v-model="search.status"
        ></v-select>
      </v-col>

      <v-col xs="12" sm="6" md="3" lg="3">
        <v-text-field
          type="text"
          label="Search"
          outlined
          dense
          v-model="search.search"
        >
        </v-text-field>
      </v-col>
      <v-btn
        small
        color="darkblue"
        class="white--text float-end mx-1 mt-3"
        @click.stop="init"
        >SUbmit <v-icon right>mdi-magnify</v-icon></v-btn
      >
      <v-btn
        small
        color="secondary"
        class="white--text float-end mx-1 mt-3"
        @click.stop="clear"
        >Clear
        <v-icon right>mdi-close-circle-multiple </v-icon>
      </v-btn>
    </v-row>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="QUOTATIONS.data"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:[`item.quo_status`]="{ item }">
        <v-chip color="secondary" small v-if="item.quo_status == 'PENDING'">
          PENDING
        </v-chip>
        <v-chip color="success" small v-else-if="item.quo_status == 'FINISH'">
          FINISH
        </v-chip>
        <v-chip color="primary" small v-else-if="item.quo_status == 'PROCESS'">
          ON PROCESS
        </v-chip>

        <v-chip color="error" small v-else-if="item.quo_status == 'CANCEL'">
          CANCEL
        </v-chip>
        <v-chip color="warning" small v-else-if="item.quo_status == 'HOLD'">
          HOLD
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="primary"
          outlined
          small
          @click.stop="selectQuotation(item)"
          >Select <v-icon right> mdi-check </v-icon></v-btn
        >
      </template>
    </v-data-table>
    <v-pagination
      v-model="currentPage"
      :length="lastPage"
      :total-visible="10"
      :disabled="disabled"
    ></v-pagination>
  </v-card>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "QuotationModal",
  data() {
    return {
      headers: [
        { text: "Quotation No.", value: "quo_number" },
        { text: "Customer", value: "customer.name" },
        { text: "Order Date", value: "quo_order_date" },
        { text: "Request Delivery Date", value: "quo_request_date" },
        { text: "Status", value: "quo_status" },
        { text: "Item Qty", value: "quotation_details_count" },
        { text: "Total Amount", value: "quo_total" },
        { text: "Created By", value: "quo_created_by" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      disabled: false,
      loading: false,
      status: ["PENDING", "PROCESS", "FINISH", "HOLD", "CANCEL"],
      search: {
        from_date: new Date().toJSON().slice(0, 10),
        end_date: new Date().toJSON().slice(0, 10),
        keyword: null,
      },
    };
  },

  methods: {
    ...mapMutations("quotation", [
      "CLEAR_STATE",
      "SET_QUOTATIONS",
      "SET_QUOTATION",
      "SET_PAGE",
    ]),
    ...mapMutations("sales_order", ["SET_SALES_ORDER"]),

    async init() {
      this.loading = true;
      this.disabled = true;
      let params = {
        page: this.page,
        status: this.search.status,
        keyword: this.search.keyword,
        from_date: this.search.from_date,
        end_date: this.search.end_date,
      };

      await this.$axios
        .get("/quotation", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_QUOTATIONS(data.quotations);
          this.loading = false;
          this.disabled = false;
        });
    },

    searching() {
      this.page = 1;
      this.init();
    },
    clear() {
      this.page = 1;
      this.search = {
        status: "",
        search: "",
        from_date: new Date().toJSON().slice(0, 10),
        end_date: new Date().toJSON().slice(0, 10),
      };
      this.init();
    },
    closeQuotationDialog() {
      this.$emit("closeQuotationDialog");
    },

    async selectQuotation(item) {
      this.loading = true;
      await this.$axios
        .get("/quotation/" + item.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          if (this.$route.path == "/quotation/create") {
            this.SET_QUOTATION(data.quotations);
            this.loading = false;
            this.$router.push("/quotation/edit");
            this.closeQuotationDialog();
          } else if (this.$route.path == "/sales-order/create") {
            this.SET_SALES_ORDER(data.quotations);
            this.loading = false;
            this.closeQuotationDialog();
          } else {
            this.SET_QUOTATION(data.quotations);
            this.loading = false;
            this.closeQuotationDialog();
          }
        })
        .catch(() => {
          this.loading = true;
        });
    },
  },

  created() {
    this.init();
  },

  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.init();
    },
  },
  computed: {
    ...mapGetters("quotation", {
      QUOTATIONS: "Quotations",
    }),

    currentPage: {
      get() {
        return this.QUOTATIONS.current_page;
      },
      set(val) {
        return this.$store.commit("quotation/SET_CURRENT_PAGE", val);
      },
    },
    lastPage: {
      get() {
        return this.QUOTATIONS.last_page;
      },
    },
  },
};
</script>
<style scoped>
::v-deep .v-data-table-header {
  background-color: #ebebeb59;
}

::v-deep th {
  color: #000 !important;
}
</style>
