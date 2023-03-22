<template>
  <main-layout>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" color="amber" />
    </v-overlay>
    <base-header>
      <template #icon>mdi-dolly</template>
      <template #name> View Purchase Order</template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template #button>
        <v-btn color="secondary" class="float-end mb-2" small to="/purchase-order">Back
          <v-icon right>mdi-arrow-left</v-icon>
        </v-btn></template>
    </base-header>

    <v-card elevation="2" rounded class="mx-2">
      <v-row dense class="mx-2">
        <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
          <v-chip v-if="PurchaseOrder.status == 'PROCESS'" color="primary" small>On Process</v-chip>
          <v-chip v-if="PurchaseOrder.status == 'FINISH'" color="success" small>Finish</v-chip>

          <v-chip v-if="PurchaseOrder.status == 'CANCEL'" color="error" small>Canceled</v-chip>
          <v-chip color="primary" class="ml-4" small outlined>Purchase Type : {{ PurchaseOrder.type }}</v-chip>
          <v-spacer></v-spacer>
        </v-app-bar>
      </v-row>

      <v-divider class="my-1"></v-divider>
      <v-row dense class="mx-5 mt-2">
        <base-column :lg="2">
          <h4 class="secondary--text">No PurchaseOrder .</h4>
          <h4>{{ PurchaseOrder.po_number }}</h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">Sales Order No .</h4>
          <h4>
            {{ PurchaseOrder.so_number ? PurchaseOrder.so_number : "-" }}
          </h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Currency.</h4>
          <h4 v-if="PurchaseOrder.currency_id">YES</h4>
          <h4 v-else>NO</h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Exchange Rate .</h4>
          <h4>
            {{
              PurchaseOrder.rate | currency("", 2, { symbolOnLeft: false, })
            }}
          </h4>
        </base-column>
      </v-row>

      <v-row dense class="mx-5 mt-5">
        <base-column :lg="2">
          <h4 class="secondary--text">Supplier</h4>
          <h4>{{ PurchaseOrder.supplier_name ? PurchaseOrder.supplier_name : "N/A" }}</h4>
          <h4>{{ PurchaseOrder.supplier_phone ? PurchaseOrder.supplier_phone : "N/A" }}</h4>
          <h4>{{ PurchaseOrder.supplier_email ? PurchaseOrder.supplier_email : "N/A" }}</h4>
        </base-column>

        <base-column :lg="2">
          <h4 class="secondary--text">Order Date .</h4>
          <h4>
            {{ PurchaseOrder.order_date }}
          </h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Request Delivey Date .</h4>
          <h4>
            {{ PurchaseOrder.request_date }}
          </h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">VAT</h4>
          <h4>
            {{ PurchaseOrder.use_vat ? "YES" : "NO" }}
          </h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">TAXES</h4>
          <h4>
            {{
              PurchaseOrder.vat | currency("", 2, { symbolOnLeft: false })
            }}
          </h4>
        </base-column>
        <base-column :lg="2">
          <h4 class="secondary--text">Created By</h4>
          <h4>
            {{ PurchaseOrder.created_by }}
          </h4>
        </base-column>
      </v-row>

      <v-row dense class="mx-5 mt-5 mb-5">
        <base-column :lg="4" :sm="12" :md="4">
          <h4 class="secondary--text">Shipping Address</h4>
          <h4>
            {{
              PurchaseOrder.shipping_address ? PurchaseOrder.shipping_address : "No Shipping Address"
            }}
          </h4>
          <h4>
            {{
              PurchaseOrder.shipping_name ? PurchaseOrder.shipping_name : "No Shipping Address"
            }}
          </h4>
        </base-column>

        <base-column :lg="4" :sm="12" :md="4">
          <h4 class="secondary--text">Shipping Mark</h4>
          <h4>
            {{ PurchaseOrder.shipping_mark ? PurchaseOrder.shipping_mark : "-" }}
          </h4>
        </base-column>
      </v-row>

      <v-data-table v-if="PurchaseOrder.type == 'PRODUCT'" :loading="loading" :headers="headers_product"
        :items="PurchaseOrder.product_list" class="elevation-1" hide-default-footer>
        <template v-slot:[`item.product_name`]="{ item }">
          <td>
            {{ item.product['name'] ?? "n/A" }}
          </td>
        </template>
        <template v-slot:[`item.product_description`]="{ item }">
          <td>
            {{ item.product['description'] ?? "n/A" }}
          </td>
        </template>
        <template v-slot:[`item.product_unit`]="{ item }">
          <td>
            {{ item.product['unit'].name ?? "n/A" }}
          </td>
        </template>
        <template v-slot:[`item.price_buy`]="{ item }">
          <td>
            <strong>
              {{
                item.price_buy | currency("", 2, { symbolOnLeft: false })
              }}</strong>
          </td>
        </template>
        <template v-slot:[`item.qty`]="{ item }">
          <td>
            <strong>{{ item.qty }}</strong>
          </td>
        </template>
        <template v-slot:[`item.remark`]="{ item }">
          <td>
            <p>{{ item.remark }}</p>
          </td>
        </template>
        <template v-slot:[`item.total_price`]="{ item }">
          <td>
            <strong>
              {{
              (item.amount =
  item.price_buy * item.qty ? item.price_buy * item.qty : 0)
  | currency("", 2, {
    symbolOnLeft: false,
  })
              }}</strong>
          </td>
        </template>
      </v-data-table>

      <!-- <v-data-table v-else :loading="loading" :headers="headers_material" :items="PurchaseOrder.item_list" class="elevation-1"
        hide-default-footer>
        <template v-slot:[`item.price_buy`]="{ item }">
          <td>
            <strong>
              {{
                item.price_buy
                  | currency("", 2, {
                    symbolOnLeft: false,
                    spaceBetweenAmountAndSymbol: true,
                  })
              }}</strong>
          </td>
        </template>
        <template v-slot:[`item.qty`]="{ item }">
          <td>
            <strong>{{ item.qty }}</strong>
          </td>
        </template>
        <template v-slot:[`item.remark`]="{ item }">
          <td>
            <p>{{ item.remark }}</p>
          </td>
        </template>
        <template v-slot:[`item.total_price`]="{ item }">
          <td>
            <strong>
              {{
              (item.amount =
  item.price_buy * item.qty ? item.price_buy * item.qty : 0)
  | currency("", 2, {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: true,
  })
              }}</strong>
          </td>
        </template>
      </v-data-table> -->

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
              Tax : <br />
              PPh : <br />
              <h3>Total :</h3>
            </td>
            <td>
              <b>{{
                PurchaseOrder.subtotal ? PurchaseOrder.subtotal : 0 | currency("", 2, { symbolOnLeft: false })
              }}
              </b>
              <hr />
              <b>{{
                PurchaseOrder.discount
                  | currency("", 2, {
                    symbolOnLeft: false
                  })
              }}
              </b>
              <hr />
              <b>{{
                PurchaseOrder.vat
                  | currency("", 2, {
                    symbolOnLeft: false,
              
                  })
              }}
              </b>
              <hr />
              <b>{{
                PurchaseOrder.pph
                  | currency("", 2, {
                    symbolOnLeft: false,
              
                  })
              }}</b>
              <hr />
              <b>
                {{
                  PurchaseOrder.total
                    | currency("", 2, {
                      symbolOnLeft: false
                    })
                }}</b>
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
  name: "PurchaseOrderView",
  data() {
    return {
      headers_product: [
        { text: "Item Code", value: "product_name" },
        { text: "Description", value: "product_description", width: 300 },
        { text: "Unit", value: "product_unit" },
        { text: "Price", value: "price_buy", width: 200 },
        { text: "QTY", value: "qty", width: 100 },
        { text: "Total Price", value: "total_price", width: 200 },
        { text: "Remark", value: "remark" },
      ],
      headers_material: [
        { text: "Material", value: "item_name" },
        { text: "Unit", value: "item_unit" },
        { text: "Price", value: "price_buy", width: 400 },
        { text: "QTY", value: "qty", width: 150 },
        { text: "Total Price", value: "total_price", width: 200 },
        { text: "Remark", value: "remark" },
      ],
      loading: false,
      shareableLink:
        process.env.VUE_APP_API_URL +
        "/purchase-order/view/" +
        this.$route.params.id,
    };
  },

  created() {
    this.getPurchaseOrder();
    this.breadcrumbs = [
      { text: "Purchase", disabled: true },
      { text: "Purchase Order", disabled: true },
      { text: "View", disabled: true },
    ];
  },

  methods: {
    ...mapMutations("purchase_order", ["CELAR_FORM", "SET_PURCHASE_ORDER"]),
    getPurchaseOrder() {
      this.loading = true;
      this.$axios
        .get("/purchase-order/" + this.$route.params.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_PURCHASE_ORDER(data.purchase_orders);
          this.loading = false;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },

  computed: {
    ...mapGetters("purchase_order", {
      PurchaseOrder: "PurchaseOrder",
    }),
  },
  destroyed() {
    this.CELAR_FORM();
  },
  components: {
    MainLayout,
    BaseHeader,
    BaseColumn,
  },
};
</script>