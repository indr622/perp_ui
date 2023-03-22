<template>
  <v-card>
    <h3 class="ml-5 my-1">Sales Breakdown by Product</h3>
    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
export default {
  name: "SalesBreackdownByProduct",
  data() {
    return {
      options: {},
      series: [44, 55, 41, 17, 15],
    };
  },
};
</script>