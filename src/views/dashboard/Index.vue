<template>
  <main-layout>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64" color="amber" />
    </v-overlay>
    <base-header>
      <template v-slot:icon> mdi-view-dashboard </template>
      <template v-slot:name> Dashboard </template>
    </base-header>

    <DashboardSummary />

    <!-- <SalesChart />
    <v-card class="mx-1">
      <h3 class="ml-5 my-1">Work In Progress</h3>
      <div id="chart">
        <apexchart
          type="rangeBar"
          height="450"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </v-card> -->
  </main-layout>
</template>

<script>
import { mapGetters } from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import DashboardSummary from "@/components/dashboard/Summary.vue";
// import SalesChart from "@/components/SalesChart.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      isLoading: false,
      series: [
        {
          name: "PE001",
          data: [
            {
              x: "Step 1",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-08").getTime(),
              ],
            },
            {
              x: "Step 2",
              y: [
                new Date("2019-03-02").getTime(),
                new Date("2019-03-05").getTime(),
              ],
            },
            {
              x: "Step 3",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-07").getTime(),
              ],
            },
            {
              x: "Step 4",
              y: [
                new Date("2019-03-03").getTime(),
                new Date("2019-03-09").getTime(),
              ],
            },
            {
              x: "Step 5",
              y: [
                new Date("2019-03-08").getTime(),
                new Date("2019-03-11").getTime(),
              ],
            },
          ],
        },
        {
          name: "PE002",
          data: [
            {
              x: "Step 1",
              y: [
                new Date("2019-03-02").getTime(),
                new Date("2019-03-05").getTime(),
              ],
            },
            {
              x: "Step 2",
              y: [
                new Date("2019-03-06").getTime(),
                new Date("2019-03-16").getTime(),
              ],
              goals: [
                {
                  name: "Break",
                  value: new Date("2019-03-10").getTime(),
                  strokeColor: "#CD2F2A",
                },
              ],
            },
            {
              x: "Step 3",
              y: [
                new Date("2019-03-03").getTime(),
                new Date("2019-03-07").getTime(),
              ],
            },
            {
              x: "Step 4",
              y: [
                new Date("2019-03-20").getTime(),
                new Date("2019-03-22").getTime(),
              ],
            },
            {
              x: "Step 5",
              y: [
                new Date("2019-03-10").getTime(),
                new Date("2019-03-16").getTime(),
              ],
            },
          ],
        },
        {
          name: "PE003",
          data: [
            {
              x: "Step 1",
              y: [
                new Date("2019-03-10").getTime(),
                new Date("2019-03-17").getTime(),
              ],
            },
            {
              x: "Step 2",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-09").getTime(),
              ],
              goals: [
                {
                  name: "Break",
                  value: new Date("2019-03-07").getTime(),
                  strokeColor: "#CD2F2A",
                },
              ],
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 450,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%",
          },
        },
        xaxis: {
          type: "datetime",
        },
        stroke: {
          width: 1,
        },
        fill: {
          type: "solid",
          opacity: 0.6,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
      },
    };
  },


  components: {
    MainLayout,
    BaseHeader,
    DashboardSummary,
    // SalesChart,
  },

  computed: {
    ...mapGetters("auth", ["User", "Can"]),
  },
};
</script>
