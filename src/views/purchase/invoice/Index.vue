<template>
  <main-layout>
    <base-header>
      <template #icon>mdi-dolly</template>
      <template #name> Purchase Invoice </template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template #button>
        <v-btn color="primary" class="float-end mb-2" small
          >Create New
          <v-icon right>mdi-plus</v-icon>
        </v-btn></template
      >
    </base-header>
    <!-- <SalesOrderSummary /> -->
    <v-row dense class="mx-1">
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="12" md="12" lg="12">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <v-card elevation="5" rounded>
          <v-spacer></v-spacer>
          <v-row class="mx-1 mb-2">
            <v-col xs="12" sm="6" md="3" lg="2">
              <CardSummary
                :icon="'mdi-receipt-text'"
                :colorPrimary="'primary'"
                :colorSecondary="'#DAE3F3'"
                status="Total"
                desc="0"
              />
            </v-col>
            <v-col xs="12" sm="6" md="3" lg="2">
              <CardSummary
                :icon="'mdi-check-circle'"
                :colorPrimary="'success'"
                :colorSecondary="'#CFF3D5'"
                status="Finish"
                desc="0"
              />
            </v-col>
            <v-col xs="12" sm="6" md="3" lg="2">
              <CardSummary
                :icon="'mdi-clock-time-eight'"
                :colorPrimary="'warning'"
                :colorSecondary="'#DAE3F3'"
                status="On Progress"
                desc="0"
              />
            </v-col>
            <v-col xs="12" sm="6" md="3" lg="2">
              <CardSummary
                :icon="'mdi-close-circle'"
                :colorPrimary="'error'"
                :colorSecondary="'#FFD4DC'"
                status="Cancel"
                desc="0"
              />
            </v-col>
            <v-col xs="12" sm="6" md="3" lg="2">
              <CardSummary
                :icon="'mdi-animation'"
                :colorPrimary="'secondary'"
                :colorSecondary="'#21272D3F'"
                status="Hold"
                desc="0"
              />
            </v-col>
            <v-col xs="12" sm="6" md="3" lg="2">
              <CardSummary
                :icon="'mdi-animation'"
                :colorPrimary="'secondary'"
                :colorSecondary="'#21272D3F'"
                status="Cancel"
                desc="0"
              />
            </v-col>
          </v-row>
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
              @click.stop="getSalesOrder"
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
            :footer-props="{
              'items-per-page-options': [10, 25, 50],
            }"
            class="elevation-1"
          >
            <template #no-data>
              <h1 class="my-10" color="#21272D">No Data</h1>
            </template>
          </v-data-table>
        </v-card>
      </v-col></v-row
    >
  </main-layout>
</template>

<script>
import { mapGetters } from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import CardSummary from "@/components/summary/CardSummary.vue";
export default {
  name: "PurchaseOrderView",

  data() {
    return {
      search: {
        from_date: null,
        end_date: null,
        status: null,
        search: null,
      },

      status: ["pending", "process", "finish", "cancel", "hold"],
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
    };
  },

  created() {
    this.breadcrumbs = [
      { text: "Purchase", disabled: false },
      { text: "Purchase Invoice", disabled: true },
    ];
  },

  methods: {
    clear() {
      this.search = {
        from_date: "",
        end_date: "",
        status: "",
        search: "",
      };
    },
  },

  computed: {
    ...mapGetters("auth", {
      TOKEN: "Token",
    }),
  },
  components: {
    MainLayout,
    BaseHeader,
    CardSummary,
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