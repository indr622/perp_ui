<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-text-field type="date" label="From date" outlined dense v-model="search.from_date">
        </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-text-field type="date" label="End date" outlined dense v-model="search.end_date">
        </v-text-field>
      </v-col>


      <v-btn color="darkblue" class="white--text float-end mx-1 mt-3" @click.stop="init">Submit <v-icon
          right>mdi-magnify</v-icon></v-btn>
      <v-btn color="secondary" class="white--text float-end mx-1 mt-3" @click.stop="clear">Clear
        <v-icon right>mdi-close-circle-multiple </v-icon>
      </v-btn>
    </v-row>
    <v-row dense>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="6" md="2">
        <v-card class="clickable" color="secondary" dark>
          <v-card-subtitle>
            <div color="primary"> Quotation | {{ SUMMARY.data.total_quotation }}</div>
          </v-card-subtitle>
          <v-card-title color="primary">{{
            SUMMARY.data.total_quotation_amount | currency("", 2, {
              symbolOnLeft: false
            })
          }} </v-card-title>
        </v-card>
      </v-col>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-card class="clickable" color="success" dark>
          <v-card-subtitle>
            <div color="primary">Sales Order | {{ SUMMARY.data.total_sales_order }}</div>
          </v-card-subtitle>
          <v-card-title color="primary">{{
            SUMMARY.data.total_sales_order_amount | currency("", 2, {
              symbolOnLeft: false
            })
          }}</v-card-title>
        </v-card>
      </v-col>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-card class="clickable" color="primary" dark>
          <v-card-subtitle>
            <div color="primary"> Purchase Order | {{ SUMMARY.data.total_purchase_order }}</div>
          </v-card-subtitle>
          <v-card-title color="primary">{{
            SUMMARY.data.total_purchase_order_amount | currency("", 2, {
              symbolOnLeft: false
            })
          }}</v-card-title>
        </v-card>
      </v-col>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-card class="clickable" color="secondary" dark>
          <v-card-subtitle>
            <div color="primary"> Shipping Intruction | {{ SUMMARY.data.total_sales_order }}</div>
          </v-card-subtitle>
          <v-card-title color="primary">{{
            SUMMARY.data.total_sales_order_amount | currency("", 2, {
              symbolOnLeft: false
            })
          }}</v-card-title>
        </v-card>
      </v-col>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-card class="clickable" color="success" dark>
          <v-card-subtitle>
            <div color="primary"> Sales Invoice | {{ SUMMARY.data.total_sales_order }}</div>
          </v-card-subtitle>
          <v-card-title color="primary">{{
            SUMMARY.data.total_sales_order_amount | currency("", 2, {
              symbolOnLeft: false
            })
          }}</v-card-title>
        </v-card>
      </v-col>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-card class="clickable" color="success" dark>
          <v-card-subtitle>
            <div color="primary"> Sales Invoice Adjustment | {{ SUMMARY.data.total_sales_order }}</div>
          </v-card-subtitle>
          <v-card-title color="primary">{{
            SUMMARY.data.total_sales_order_amount | currency("", 2, {
              symbolOnLeft: false
            })
          }}</v-card-title>
        </v-card>
      </v-col>

    </v-row>

    <v-row>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="12" md="9">
        <SalesReport />
      </v-col>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="12" md="3">
        <SalesBrackdown />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SalesBrackdown from "@/components/chart/SalesBrackdown.vue";
import SalesReport from "@/components/chart/SalesReport.vue";
export default {
  components: { SalesBrackdown, SalesReport },
  name: "DashboardSummary",
  data: () => ({
    status: ["PENDING", "PROCESS", "FINISH", "HOLD", "CANCEL"],
    search: {
      from_date: new Date().toJSON().slice(0, 10),
      end_date: new Date().toJSON().slice(0, 10),
      keyword: null,
    },
  }),

  computed: {
    ...mapGetters('dashboard', {
      SUMMARY: 'Summary',

    }),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },


};
</script>