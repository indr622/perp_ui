<template>
  <v-col xs="12" sm="12" md="12" lg="12">
    <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
    <v-card elevation="5" rounded>
      <v-spacer></v-spacer>
      <v-row class="mx-1 mb-2">
        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <card-summary :icon="'mdi-receipt-text'" :colorPrimary="'primary'" :colorSecondary="'#DAE3F3'" status="Total"
            :desc="this.widget.total_quotation" :money="this.widget.total_quotation_amount" /></base-column>
        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <card-summary :icon="'mdi-animation'" :colorPrimary="'secondary'" :colorSecondary="'#21272D3F'"
            status="Pending" :desc="this.widget.total_quotation_pending"
            :money="this.widget.total_quotation_pending_amount" /></base-column>
        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <card-summary :icon="'mdi-check-circle'" :colorPrimary="'success'" :colorSecondary="'#CFF3D5'" status="Finish"
            :desc="this.widget.total_quotation_finish"
            :money="this.widget.total_quotation_finish_amount" /></base-column>
        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <card-summary :icon="'mdi-clock-time-eight'" :colorPrimary="'warning'" :colorSecondary="'#DAE3F3'"
            status="process" :desc="this.widget.total_quotation_process"
            :money="this.widget.total_quotation_process_amount" /></base-column>
        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <card-summary :icon="'mdi-close-circle'" :colorPrimary="'error'" :colorSecondary="'#FFD4DC'" status="Cancel"
            :desc="this.widget.total_quotation_cancel"
            :money="this.widget.total_quotation_cancel_amount" /></base-column>
      </v-row>
      <v-row class="mx-1 mb-1">
        <v-col xs="12" sm="6" md="2" lg="2">
          <v-text-field type="date" label="From date" outlined dense v-model="search.from_date">
          </v-text-field>
        </v-col>
        <v-col xs="12" sm="6" md="2" lg="2">
          <v-text-field type="date" label="End date" outlined dense v-model="search.end_date">
          </v-text-field>
        </v-col>
        <v-col xs="12" sm="6" md="2" lg="2">
          <v-select :items="status" outlined dense attach chips label="Status" v-model="search.status"></v-select>
        </v-col>

        <v-col xs="12" sm="6" md="3" lg="3">
          <v-text-field type="text" label="Search" outlined dense v-model="search.search">
          </v-text-field>
        </v-col>
        <v-btn small color="darkblue" class="white--text float-end mx-1 mt-3" @click.stop="init">SUbmit <v-icon
            right>mdi-magnify</v-icon></v-btn>
        <v-btn small color="secondary" class="white--text float-end mx-1 mt-3" @click.stop="clear">Clear
          <v-icon right>mdi-close-circle-multiple </v-icon>
        </v-btn>
      </v-row>
      <v-data-table :loading="loading" :headers="headers" :items="QUOTATIONS.data" class="elevation-1"
        hide-default-footer>
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
          <v-tooltip color="dark" bottom>
            <template v-slot:activator="{ on, attrs }" v-if="CAN('Quotation-Edit')">
              <v-btn class="mr-2" color="primary" v-bind="attrs" icon small @click.stop="view(item.id)" v-on="on">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>View Quotation</span>
          </v-tooltip>
          <v-tooltip color="dark" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-2" color="warning" v-bind="attrs" icon small @click.stop="edit(item.id)" v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Quotation</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10" :disabled="disabled"></v-pagination>
    </v-card>
  </v-col>
</template>

<script>
import CardSummary from "@/components/summary/CardSummary.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "QuotationList",
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
      widget: [],
      status: ["PENDING", "PROCESS", "FINISH", "HOLD", "CANCEL"],
      search: {
        from_date: new Date().toJSON().slice(0, 10),
        end_date: new Date().toJSON().slice(0, 10),
        keyword: null,
      },
    };
  },

  methods: {
    ...mapMutations("quotation", ["CLEAR_STATE", "SET_QUOTATIONS", "SET_QUOTATION", "SET_PAGE"]),

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
    async getSummary() {
      let params = {
        from_date: this.search.from_date,
        end_date: this.search.end_date,
      };

      await this.$axios
        .get("/quotation/widget", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.widget = data.data;
        });
    },

    async edit(id) {
      this.loading = true;
      await this.$axios
        .get("/quotation/" + id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_QUOTATION(data.quotations);
          this.loading = false;
          this.$router.push("/quotation/edit");
        })
        .catch(() => {
          this.loading = true;
        });
    },
    view(id) {
      this.$router.push("/quotation/view/" + id);
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
  },

  created() {
    this.init();
    this.getSummary();
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
    ...mapGetters("auth", {
      CAN: "Can",
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


  components: {
    CardSummary,
    BaseColumn,
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