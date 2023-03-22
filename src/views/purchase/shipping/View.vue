<template>
  <main-layout>
    <base-header>
      <template #icon>mdi-dolly</template>
      <template #name> View Shipping Intruction</template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template #button>
        <v-btn color="secondary" class="float-end mb-2" small to="/purchase-shipping">Back
          <v-icon right>mdi-arrow-left</v-icon>
        </v-btn></template>
    </base-header>

    <v-card elevation="2" rounded class="mx-2">
      <v-row dense class="mx-2">
        <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
          <!-- <v-chip v-if="PurchaseShipping.status == 'PROCESS'" color="primary" small>On Process</v-chip>
          <v-chip v-if="PurchaseShipping.status == 'FINISH'" color="success" small>Finish</v-chip>
          <v-chip v-if="PurchaseShipping.status == 'DELIVERY'" color="success" small>Delivery</v-chip>
          <v-chip v-if="PurchaseShipping.status == 'CANCEL'" color="error" small>Canceled</v-chip> -->
          <v-chip color="primary" class="ml-4" small outlined>Purchase Type : {{ PurchaseShipping.type }}</v-chip>
          <v-spacer></v-spacer>
        </v-app-bar>
      </v-row>

      <v-divider class="my-1"></v-divider>
      <v-row dense class="mx-5 mt-2">
        <base-column :lg="2">
          <h4 class="secondary--text">Delivery Number .</h4>
          <h4>{{ PurchaseShipping.shp_number }}</h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Purchase Order No .</h4>
          <h4>{{ PurchaseShipping.po_number }}</h4>

        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Currency.</h4>
          <h4 v-if="PurchaseShipping.currency_id">YES</h4>
          <h4 v-else>NO</h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Exchange Rate .</h4>
          <h4>
            {{
              PurchaseShipping.rate | currency("", 2, { symbolOnLeft: false })
            }}
          </h4>
        </base-column>
      </v-row>

      <v-row dense class="mx-5 mt-5">
        <base-column :lg="2">
          <h4 class="secondary--text">Supplier</h4>
          <h4>
            {{
              PurchaseShipping.supplier_name ?? "N/A"
            }}
          </h4>
          <h4>
            {{
              PurchaseShipping.supplier_phone ?? "N/A"
            }}
          </h4>
          <h4>
            {{
              PurchaseShipping.supplier_email ?? "N/A"
            }}
          </h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">Request Delivey Date .</h4>
          <h4>
            {{ PurchaseShipping.request_date }}
          </h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">VAT</h4>
          <h4>
            {{ PurchaseShipping.use_vat ? "YES" : "NO" }}
          </h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">TAXES</h4>
          <h4> {{ PurchaseShipping.shp_vat | currency("", 2, { symbolOnLeft: false }) }}</h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Created By</h4>
          <h4> {{ PurchaseShipping.created_by ?? "N/A" }}</h4>
        </base-column>
      </v-row>

      <v-row dense class="mx-5 mt-5 mb-5">
        <base-column :lg="4" :sm="12" :md="4">
          <h4 class="secondary--text">Shipping Address</h4>
          <h4>{{ PurchaseShipping.shipping_address ?? "N/A" }}</h4>
          <h4> {{ PurchaseShipping.shipping_name ?? "N/A" }}</h4>
        </base-column>

        <base-column :lg="4" :sm="12" :md="4">
          <h4 class="secondary--text">Shipping Mark</h4>
          <h4>{{ PurchaseShipping.shipping_mark ?? "N/A" }}</h4>
        </base-column>

        <base-column :lg="4" :sm="12" :md="4">
          <h4 class="secondary--text">Notes</h4>
          <h4>
            {{ PurchaseShipping.note ?? "N/A" }}
          </h4>
        </base-column>
      </v-row>
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
  name: "PurchaseShippingView",
  data() {
    return {
      purchase_shipping: [],
      shareableLink:
        process.env.VUE_APP_API_URL +
        "/purchase-shipping/view/" +
        this.$route.params.id,
    };
  },

  created() {
    this.init();
    this.breadcrumbs = [
      { text: "Purchase", disabled: true },
      { text: "Purchase Order", disabled: true },
      { text: "View", disabled: true },
    ];
  },

  methods: {
    ...mapMutations("purchase_shipping", ["CLEAR_STATE", "SET_PURCHASE_SHIPPING"]),
    init() {
      this.loading = true;
      this.$axios
        .get("/purchase-shipping/" + this.$route.params.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_PURCHASE_SHIPPING(data.purchase_shipping);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    ...mapGetters("purchase_shipping", {
      PurchaseShipping: "PurchaseShipping",
    }),
  },
  destroyed() {
    this.CLEAR_STATE();
  },
  components: {
    MainLayout,
    BaseHeader,
    BaseColumn,
  },
};
</script>