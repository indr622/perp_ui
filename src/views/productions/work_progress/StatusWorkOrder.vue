<template>
  <v-card class="mt-10" rounded>
    <v-row class="mx-1 mb-2">
      <v-col xs="12" sm="6" md="3" lg="2">
        <CardSummary :icon="'mdi-receipt-text'" :colorPrimary="'primary'" :colorSecondary="'#DAE3F3'" status="Total"
          desc="0" />
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="2">
        <CardSummary :icon="'mdi-check-circle'" :colorPrimary="'success'" :colorSecondary="'#CFF3D5'" status="Finish"
          desc="0" />
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="2">
        <CardSummary :icon="'mdi-clock-time-eight'" :colorPrimary="'warning'" :colorSecondary="'#DAE3F3'"
          status="On Progress" desc="0" />
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="2">
        <CardSummary :icon="'mdi-close-circle'" :colorPrimary="'error'" :colorSecondary="'#FFD4DC'" status="Cancel"
          desc="0" />
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="2">
        <CardSummary :icon="'mdi-animation'" :colorPrimary="'secondary'" :colorSecondary="'#21272D3F'" status="Hold"
          desc="0" />
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="2">
        <CardSummary :icon="'mdi-animation'" :colorPrimary="'secondary'" :colorSecondary="'#21272D3F'" status="Cancel"
          desc="0" />
      </v-col>
    </v-row>
    <v-row class="mx-1 mb-1">
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-text-field type="date" label="From date" outlined dense>
        </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-text-field type="date" label="End date" outlined dense>
        </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="3">
        <v-select outlined dense :items="status" attach chips label="Status" multiple></v-select>
      </v-col>

      <v-col xs="12" sm="6" md="3" lg="3">
        <v-text-field type="text" label="Search" outlined dense> </v-text-field>
      </v-col>
      <v-col xs="12" sm="6" md="2" lg="2">
        <v-btn color="darkblue" class="white--text">Submit</v-btn>
        <v-icon class="float-end ma-2" color="primary">mdi-cloud-print</v-icon>
        <v-icon class="float-end ma-2" color="success">mdi-download</v-icon>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" class="elevation-1">
      <template #no-data>
        <h1 class="my-10" color="#21272D">Please Select date range first</h1>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import CardSummary from "@/components/summary/CardSummary.vue";
export default {
  name: "StatusWorkOrderView",

  data() {
    return {
      headers: [
        { text: "NO.Work Order", value: "work_order" },
        { text: "Workplace", value: "work_order_date" },
        { text: "Item Name", value: "customer" },
        { text: "Order Date", value: "status" },
        { text: "Due Date", value: "status" },
        { text: "Est Date", value: "status" },
        { text: "Total QTY", value: "status" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },
  components: {
    CardSummary,
  },
};
</script>

<style></style>