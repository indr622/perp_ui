<template>
  <div>
    <div v-if="this.PurchaseShipping.type === 'PRODUCT'">
      <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
        <v-toolbar-title> Product List</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-data-table :loading="loading" :headers="headers_product" :items="PurchaseShipping.product_list"
        class="elevation-1" hide-default-footer fixed-header :expanded.sync="expanded" :single-expand="true">
        <template v-slot:[`item.product`]="{ item }">
          <td><b>{{ item.product }}</b></td>
        </template>
        <template v-slot:[`item.description`]="{ item }">
          <td>
            <p>{{ item.description }}</p>
          </td>
        </template>
        <template v-slot:[`item.price`]="{ item }">
          <td>
            <p>{{ item.price | currency("", 2, { symbolOnLeft: false }) }}</p>
          </td>
        </template>
        <template v-slot:[`item.qty`]="{ item }">
          <td><b>{{ item.qty }}</b></td>
        </template>
        <template v-slot:[`item.qty_available`]="{ item }">
          <td><b>{{ item.qty_available }}</b></td>
        </template>
        <template v-slot:[`item.qty_delivery`]="{ item }">
          <td>
            <v-text-field class="mt-2" v-model="item.qty_delivery" dense outlined type="number"></v-text-field>
          </td>
        </template>
        <template v-slot:[`item.remaining`]="{ item }">
          <td><b>{{ item.qty_available - item.qty_delivery }}</b></td>
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          <td><b>{{ (item.price * item.qty_delivery) / 100 | currency("", 2, { symbolOnLeft: false }) }}</b></td>
        </template>
        <template v-slot:[`item.remark`]="{ item }">
          <td>
            <p>{{ item.remark }}</p>
          </td>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <td>
            <v-icon color="error" @click="removeItem(item)">mdi-delete </v-icon>
          </td>
        </template>
      </v-data-table>
    </div>

    <div v-if="this.PurchaseShipping.type === 'MATERIAL'">
      <v-data-table :loading="loading" :headers="headers_material" :items="PurchaseShipping.item_list"
        class="elevation-1" hide-default-footer fixed-header>
        <template v-slot:[`item.item_name`]="{ item }">
          <td>{{ item.item_name ? item.item_name : item.item.name }}</td>
        </template>
        <template v-slot:[`item.item_unit`]="{ item }">
          <td>{{ item.item_unit ? item.item_unit : item.item.unit_id }}</td>
        </template>
        <template v-slot:[`item.description`]="{ item }">
          <td>{{ item.description ? item.description : "No Description" }}</td>
        </template>
        <template v-slot:[`item.total_price`]="{ item }">
          <td>
            <b>{{ item.amount = (item.price_buy * item.qty) / 100 | currency("", 2, { symbolOnLeft: false }) }}</b>
          </td>
        </template>
        <template v-slot:[`item.price_buy`]="{ item }">
          <td class="mt-2">
            <v-text-field focus class="mt-4" dense type="number" outlined v-model="item.price_buy"></v-text-field>
          </td>
        </template>
        <template v-slot:[`item.balance`]="{ item }">
          <td v-if="item.qty_delivery > item.qty">
            <span class="error--text">qty delivery is bigger than qty</span>
          </td>
          <td v-else>
            <b> {{(item.balance = item.qty - item.qty_delivery ?? 0)}}</b>
          </td>
        </template>
        <template v-slot:[`item.qty_delivery`]="{ item }">
          <td>
            <v-text-field class="mt-4" dense outlined type="number" v-model="item.qty_delivery"
              :rules="rule_qty"></v-text-field>
          </td>
        </template>
        <template v-slot:[`item.remark`]="{ item }">
          <td>
            <v-textarea class="mt-4" rows="1" dense outlined v-model="item.remark"></v-textarea>
          </td>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <td>
            <v-icon color="error" @click="removeItem(item)">mdi-delete </v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
    <v-simple-table fixed-header>
      <thead>
        <tr>
          <th class="text-left" width="60%"></th>
          <th class="text-left" width="10%"></th>
          <th class="text-left" width="10%"></th>
          <th class="text-left" width="20%"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td class="text-right">
            Sub Total : <br />
            Discount : <br />
            Tax : <br />
            PPh : <br />
            <h3>Total :</h3>
          </td>

          <td>
            <b>{{ sub_total ?? 0 | currency("", 2, { symbolOnLeft: false })}}
              <input type="hidden" v-model="subtotal" />
              <input type="hidden" v-model="afterDiscount" />
            </b>
            <hr />
            <b>{{ discount | currency("", 2, { symbolOnLeft: false })}}</b>
            <hr />
            <b>{{ tax| currency("", 2, { symbolOnLeft: false })}}</b>
            <hr />
            <b>{{ pph| currency("", 2, { symbolOnLeft: false }) }}</b>
            <hr />
            <b>{{ total| currency("", 2, { symbolOnLeft: false }) }}</b>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  name: "PurchaseShippingItem",

  data() {
    return {
      headers_product: [
        { text: "Item Code", value: "product" },
        { text: "Description", value: "description" },
        { text: "Price /100", value: "price" },
        { text: "QTY", value: "qty" },
        { text: "QTY Available", value: "qty_available" },
        { text: "QTY Delivery", value: "qty_delivery", width: 150 },
        { text: "Remaining Balance", value: "remaining" },
        { text: "Amount", value: "amount" },
        { text: "Remark", value: "remark" },
        { text: "Action", value: "action", sortable: false, width: 100 },
      ],
      headers_material: [
        { text: "Material", value: "item_name" },
        { text: "Unit", value: "item_unit" },
        { text: "Price /100", value: "price_buy" },
        { text: "QTY", value: "qty" },
        { text: "QTY Delivery", value: "qty_delivery", width: 100 },
        { text: "Balance", value: "balance" },
        { text: "Total Price", value: "total_price" },
        { text: "Remark", value: "remark" },
        { text: "Action", value: "action", sortable: false, width: 100 },
      ],

      expanded: [],
      loading: false,
    };
  },
  methods: {
    ...mapMutations("purchase_shipping", [
      "SET_VAT",
      "SET_SUBTOTAL",
      "SET_DISCOUNT",
      "SET_PPH",
      "SET_TOTAL",
    ]),
    removeProduct(index) {
      this.PurchaseShipping.product_list.splice(index, 1);
    },

    removeItem(index) {
      this.PurchaseShipping.item_list.splice(index, 1);
    },

    dataTableRowClicked(item) {
      if (item === this.expanded[0]) {
        this.expanded = [];
      } else {
        this.expanded = [item];
      }
    },
  },

  computed: {
    ...mapGetters("purchase_shipping", {
      PurchaseShipping: "PurchaseShipping",
    }),
    ...mapGetters("pph", {
      PPH: "Pph",
    }),

    subtotal() {
      return this.$store.commit(
        "purchase_shipping/SET_SUBTOTAL",
        this.sub_total ?? 0
      );
    },
    afterDiscount() {
      let discount = this.sub_total - this.discount;
      if (discount > 0) {
        return discount;
      } else {
        return 0;
      }
    },

    sub_total() {
      if (this.PurchaseShipping.type === "MATERIAL") {
        return _.sumBy(this.PurchaseShipping.item_list, function (t) {
          let total = (t.price * t.qty_delivery) / 100;
          return total;
        });
      } else {
        return _.sumBy(this.PurchaseShipping.product_list, function (t) {
          let total = (t.price * t.qty_delivery) / 100;
          return total;
        });
      }
    },
    discount() {
      return (this.sub_total * this.PurchaseShipping.discount_percent) / 100;
    },
    tax() {
      if (this.PurchaseShipping.use_vat) {
        this.SET_VAT((this.afterDiscount * 11) / 100);
        return (this.afterDiscount * 11) / 100;
      } else {
        this.SET_VAT(0);
        return 0;
      }
    },
    pph() {
      this.SET_PPH((this.afterDiscount * this.PPH.percentage) / 100);
      return (
        (this.afterDiscount * this.PPH.percentage
          ? this.afterDiscount * this.PPH.percentage
          : 0) / 100
      );
    },
    total() {
      this.SET_TOTAL(this.afterDiscount + this.tax);
      return this.afterDiscount + this.tax;
    },
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
