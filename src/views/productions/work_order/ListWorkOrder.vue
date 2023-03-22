<template>
  <v-card class="mt-10" rounded>
    <v-row class="mx-1 mb-1">
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-text-field type="date" label="From date" outlined dense>
        </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-text-field type="date" label="End date" outlined dense>
        </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="2">
        <v-select outlined dense :items="item" label="Item"></v-select>
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="2">
        <v-select outlined dense :items="status" label="Status"></v-select>
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="3">
        <v-text-field type="text" label="Search" outlined dense> </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="2" lg="1">
        <v-btn color="darkblue" class="white--text">Submit</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="6">
        <v-card-title>Select data to create Work Order</v-card-title>
      </v-col>
      <v-col cols="6" class="pa-6">
        <v-btn color="primary" class="white--text float-end" small to="/work-order/create"><v-icon>mdi-plus</v-icon>Create
          New</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="sales_order" show-select :loading="loading" class="elevation-1">
      <template #no-data>
        <h1 class="my-10" color="#21272D">Please Select date range first</h1>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ListWorkOrderView",
  data() {
    return {
      loading: false,
      headers: [
        { text: "No Sales Order", value: "number" },
        { text: "Item Name", value: "item_name" },
        { text: "Customer", value: "customer.name" },
        { text: "Retailer", value: "retailer.name" },
        { text: "Product Name" },
        { text: "Order Date" },
        { text: "Due Date" },
        { text: "Unit" },
        { text: "QTY" },
        { text: "Remark" },
      ],

      sales_order: [],
      status: [
        { text: "Pending", value: "pending" },
        { text: "In Progress", value: "in_progress" },
        { text: "Done", value: "done" },
      ],
      item: [
        { text: "Type Name", value: "type_name" },
        { text: "Applied To", value: "applied_to" },
        { text: "Status ", value: "status" },
      ],
    };
  },

  created() {
    this.getSalesOrder();
  },

  methods: {
    async getSalesOrder() {
      this.loading = true;
      var params = {
        status: "pending",
      };
      await this.$axios
        .get("/sales-order", {
          params: params,
          headers: {
            Authorization: this.TOKEN,
          },
        })
        .then(({ data }) => {
          this.sales_order = data.sales_order.data;
          this.loading = false;
        });
    },
  },

  computed: {
    ...mapGetters("auth", {
      ACCESS_TOKEN: "AccessToken",
      TOKEN: "Token",
    }),
  },
};
</script>

 