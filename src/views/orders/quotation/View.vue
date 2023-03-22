<template>
  <main-layout>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" color="amber" />
    </v-overlay>

    <base-header>
      <template #icon> mdi-file</template>
      <template #name> View Quotation</template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template #button>
        <v-btn color="secondary" class="float-end mb-2" small to="/quotation">Back
          <v-icon right>mdi-arrow-left</v-icon>
        </v-btn></template>
    </base-header>

    <v-card elevation="2" rounded class="mx-2">
      <v-row dense class="mx-2">
        <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
          <v-chip v-if="Quotation.quo_status == 'PENDING'" color="secondary" small>Pending</v-chip>
          <v-chip v-if="Quotation.quo_status == 'PROCESS'" color="warning" small>On Process</v-chip>
          <v-chip v-if="Quotation.quo_status == 'SUCCESS'" color="secondary" small>Finish</v-chip>
          <v-chip v-if="Quotation.quo_status == 'HOLD'" color="secondary" small>Hold</v-chip>
          <v-chip v-if="Quotation.quo_status == 'CANCEL'" color="error" small>Canceled</v-chip>
          <v-spacer></v-spacer>
        </v-app-bar>
      </v-row>
      <v-divider></v-divider>

      <v-row dense class="mx-5 mt-2">
        <base-column :lg="2">
          <h4 class="secondary--text">Quotation No .</h4>
          <h4>{{ Quotation.quo_number }}</h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">Customer PO No .</h4>
          <h4>{{ Quotation.customer_po }}</h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">Currency.</h4>
          <h4 v-if="Quotation.currency_id">YES</h4>
          <h4 v-else>NO</h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">Exchange Rate .</h4>
          <h4>
            {{ Quotation.rate | currency("", 2, { symbolOnLeft: false }) }}
          </h4>
        </base-column>
      </v-row>

      <v-row dense class="mx-5 mt-5">
        <base-column :lg="2">
          <h4 class="secondary--text">Customer</h4>
          <h4>
            {{ Quotation.customer_name }}
          </h4>
          <h4>
            {{ Quotation.customer_phone }}
          </h4>
          <h4>
            {{ Quotation.customer_email }}
          </h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">Retailer .</h4>
          <h4>
            {{ Quotation.retailer_name }}
          </h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Request Delivery Date </h4>
          <h4>
            {{ Quotation.request_date }}
          </h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">VAT</h4>
          <h4>
            {{ Quotation.use_vat ? "YES" : "NO" }}
          </h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">Created By</h4>
          <h4>
            {{ Quotation.created_by }}
          </h4>
        </base-column>
      </v-row>

      <v-row dense class="mx-5 mt-5">
        <base-column :lg="6" :sm="12" :md="6">
          <h4 class="secondary--text">Shipping Address</h4>
          <h4>
            {{ Quotation.shipping_name }}
          </h4>
          <h4>
            {{ Quotation.shipping_phone }} | {{ Quotation.shipping_email }}
          </h4>
          <h4>
            {{ Quotation.shipping_address }}
          </h4>
        </base-column>
      </v-row>
      <v-simple-table class="mx-2 my-3" fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Product Name</th>
              <th class="text-left">Item Name</th>
              <th class="text-left">Unit</th>
              <th class="text-left">QTY</th>
              <th class="text-left">Price Source</th>
              <th class="text-left">Thick</th>
              <th class="text-left">Width</th>
              <th class="text-left">Length</th>
              <th class="text-left">Tape</th>
              <th class="text-left">Print</th>
              <th class="text-left">Remark</th>
              <th class="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in Quotation.product_list" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ row.product.name }}</td>
              <td>{{ row.product.item.name }}</td>
              <td>{{ row.product.item_id }}</td>
              <td>{{ row.qty }}</td>
              <td>
                {{
                  row.product.price | currency("", 2, { symbolOnLeft: false })
                }}
              </td>
              <td>{{ row.product.thick }}</td>
              <td>{{ row.product.width }}</td>
              <td>{{ row.product.length }}</td>
              <td>{{ row.product.sealtape }}</td>
              <td>{{ row.product.printing ? 'YES' : 'NO' }}</td>
              <td>{{ row.remark }}</td>
              <td>
                {{
                (row.product.price * row.qty) | currency("", 2, { symbolOnLeft: false })
                }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-simple-table class="mx-2 mb-3" fixed-header>
        <thead>
          <tr>
            <th class="text-left" width="60%"></th>
            <th class="text-left" width="20%"></th>
            <th class="text-left" width="20%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td class="text-right">
              Sub Total : <br />
              Discount : <br />
              Additional Charge : <br />
              VAT : <br />
              <h3>Total :</h3>
            </td>
            <td>
              <b>
                {{
                  Quotation.subtotal | currency("", 2, { symbolOnLeft: false })
                }}
              </b>
              <br />
              <b>
                {{
                  Quotation.discount | currency("", 2, { symbolOnLeft: false })
                }}
              </b>
              <br />
              <b>
                {{
                  Quotation.vat | currency("", 2, { symbolOnLeft: false })
                }}
              </b>
              <br />
              <b>
                {{
                  Quotation.additional_cost | currency("", 2, { symbolOnLeft: false })
                }}
              </b>
              <br />
              <b>
                {{
                  Quotation.total | currency("", 2, { symbolOnLeft: false })
                }}
              </b>
              <br />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>

    <iframe :src="`${shareableLink}`" width="100%" height="100%" />
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "SalesOrderView",

  data() {
    return {
      loading: false,
      shareableLink:
        process.env.VUE_APP_API_URL +
        "/quotation/view/" +
        this.$route.params.id,
      quotations: [],
    };
  },

  created() {
    this.initialize();
    this.breadcrumbs = [
      { text: "Order", disabled: false, to: "/dashboard" },
      { text: "Quotation", disabled: true },
      { text: "Quotation Detail", disabled: true },
    ];
  },

  methods: {
    ...mapMutations("quotation", ["SET_QUOTATION", "CLEAR_STATE"]),
    async initialize() {
      this.loading = true;
      await this.$axios
        .get("/quotation/" + this.$route.params.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_QUOTATION(data.quotations);
          this.loading = false;
        });
    },
    filter() {
      this.overlay = true;
      setTimeout(() => {
        this.overlay = false;
      }, 500);
    },
  },

  destroyed() {
    this.CLEAR_STATE();
  },

  computed: {
    ...mapGetters("quotation", ["Quotation"]),
  },
  components: {
    MainLayout,
    BaseHeader,
    BaseColumn,
  },
};
</script>