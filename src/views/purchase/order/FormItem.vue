<template>
  <div>
    <div
      v-if="(this.PurchaseOrder.supplier_id && this.PurchaseOrder.type == 'PRODUCT') || (this.PurchaseOrder.so_number && this.PurchaseOrder.type == 'PRODUCT')">
      <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
        <v-toolbar-title> Product List</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small class="ma-1" color="primary" @click="openProductDialog">
          Add Product
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-data-table :loading="loading" :headers="headers_product" :items="PurchaseOrder.product_list" class="elevation-1"
        hide-default-footer fixed-header :expanded.sync="expanded" :single-expand="true">
        <template v-slot:[`item.product_name`]="{ item }">
          <td>
            {{ item.product_name ? item.product_name : item.product.name }}
          </td>
        </template>
        <template v-slot:[`item.description`]="{ item }">
          <td>
            {{ item.description ? item.description : item.product.description }}
          </td>
        </template>
        <template v-slot:[`item.price_buy`]="{ item }">
          <td>
            <v-text-field class="mt-2" dense type="number" outlined v-model="item.price_buy"></v-text-field>
          </td>
        </template>
        <template v-slot:[`item.qty`]="{ item }">
          <td>
            <v-text-field class="mt-2" dense type="number" outlined v-model="item.qty"></v-text-field>
          </td>
        </template>
        <template v-slot:[`item.remark`]="{ item }">
          <td>
            <v-textarea class="mt-2" rows="1" dense outlined v-model="item.remark"></v-textarea>
          </td>
        </template>
        <template v-slot:[`item.total_price`]="{ item }">
          <td>
            <b>
              {{
                (item.amount = (item.price_buy * item.qty) / 100) | currency("", 2,
                  { symbolOnLeft: false })
              }}</b>
          </td>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <td>
            <v-icon color="error" @click="removeProduct(item)">mdi-delete
            </v-icon>
          </td>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col cols="12" class="mt-2">
                Artwork
                <v-img :lazy-src="item.image" :src="item.image" width="150"></v-img>
                <hr />
              </v-col>
              <v-col cols="12" class="mt-2 mb-2">
                <span class="my-1">Spesification</span>
                <v-simple-table>
                  <thead class="text-center">
                    <th>Thickness</th>
                    <th>Width</th>
                    <th>Length</th>
                    <th>Flap</th>
                    <th>Gusset</th>
                    <th>Pillow Bag</th>
                    <th>Pillow Fold</th>
                    <th>Air Hole</th>
                    <th>Sealtape</th>
                    <th>Sealtape Type</th>
                    <th>Perforation</th>
                    <th>Print</th>
                    <th>Print Color</th>
                  </thead>
                  <tbody>
                    <tr class="text-center">
                      <td>{{ item.thick }}</td>
                      <td>{{ item.width }}</td>
                      <td>{{ item.length }}</td>
                      <td>{{ item.flap }}</td>
                      <td>{{ item.gusset }}</td>
                      <td>{{ item.pillow_bag }}</td>
                      <td>{{ item.pillow_fold ? item.pillow_fold : "N/A" }}</td>
                      <td>{{ item.air_hole ? item.air_hole : "N/A" }}</td>
                      <td>{{ item.sealtape }}</td>
                      <td>{{ item.sealtape_type }}</td>
                      <td>{{ item.perforation ? "Yes" : "No" }}</td>
                      <td>{{ item.print ? "Yes" : "No" }}</td>
                      <td>{{ item.color }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </div>

    <div v-else-if="this.PurchaseOrder.supplier_id && this.PurchaseOrder.type == 'MATERIAL'">
      <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
        <v-toolbar-title> Material List</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small class="ma-1" color="primary" @click="openItemDialog">
          Add Material
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-data-table :loading="loading" :headers="headers_material" :items="PurchaseOrder.item_list" class="elevation-1"
        hide-default-footer fixed-header>
        <template v-slot:[`item.item_name`]="{ item }">
          <td>{{ item.item_name ? item.item_name : item.item.name }}</td>
        </template>
        <template v-slot:[`item.item_unit`]="{ item }">
          <td>{{ item.item_unit ? item.item_unit : item.item.unit.name }}</td>
        </template>
        <template v-slot:[`item.description`]="{ item }">
          <td>{{ item.description ? item.description : "No Description" }}</td>
        </template>
        <template v-slot:[`item.total_price`]="{ item }">
          <td>
            <b>
              {{
                (item.amount = (item.price_buy * item.qty) / 100 ?? 0) | currency("", 2, {
                  symbolOnLeft:
                    false,
                })
              }}</b>
          </td>
        </template>
        <template v-slot:[`item.price_buy`]="{ item }">
          <td class="mt-2">
            <v-text-field focus class="mt-4" dense type="number" outlined v-model="item.price_buy"></v-text-field>
          </td>
        </template>
        <template v-slot:[`item.qty`]="{ item }">
          <td>
            <v-text-field class="mt-4" dense type="number" outlined v-model="item.qty"></v-text-field>
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
          <th class="text-left" width="45%"></th>
          <th class="text-left" width="10%"></th>
          <th class="text-left" width="25%"></th>
          <th class="text-left" width="1%"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td class="text-right">
            Sub Total : <br />
            Discount : <br />
            VAT 11% : <br />
            PPh : <br />
            <h3>Total :</h3>
          </td>
          <td>
            <b>{{ sub_total ? sub_total : 0 | currency("", 2, { symbolOnLeft: false }) }}
              <input type="hidden" v-model="subtotal" />
            </b>
            <hr />
            <b>{{ discount | currency("", 2, { symbolOnLeft: false }) }}
              |
              <v-icon color="success" small>mdi-arrow-bottom-right-thin
              </v-icon>
              <b class="success--text">{{ afterDiscount | currency("", 2, { symbolOnLeft: false }) }}</b>
            </b>
            <hr />
            <b>{{ tax | currency("", 2, { symbolOnLeft: false }) }}
            </b>
            <hr />
            <b>{{ pph | currency("", 2, { symbolOnLeft: false, }) }}</b>
            <hr />
            <b> {{ total | currency("", 2, { symbolOnLeft: false, }) }}</b>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <!-- product dialog -->
    <v-dialog v-model="dialogProduct" max-width="1200px" persistent>
      <product-modal v-on:closeProductDialog="closeProductDialog" v-on:selectProduct="selectProduct" />
    </v-dialog>
    <!-- end product dialog -->

    <!-- Item dialog -->
    <v-dialog v-model="dialogItem" max-width="1200px" persistent>
      <item-modal v-on:closeItemDialog="closeItemDialog" v-on:selectItem="selectItem" />
    </v-dialog>
    <!-- end Item dialog -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ProductModal from "@/components/modal/ProductsModal.vue";
import ItemModal from "@/components/modal/ItemModal.vue";
import _ from "lodash";
export default {
  name: "FormItem",

  data() {
    return {
      dialogProduct: false,
      dialogItem: false,
      headers_product: [
        { text: "Item Code", value: "product_name", width: 200 },
        { text: "Description", value: "description", width: 200 },
        { text: "Unit", value: "product_unit", width: 100 },
        { text: "Price Buy /100", value: "price_buy", width: 200 },
        { text: "QTY", value: "qty", width: 140 },
        { text: "Total Price", value: "total_price", width: 150 },
        { text: "Remark", value: "remark", width: 100 },
        { text: "Action", value: "action", sortable: false, width: 100 },
      ],
      headers_material: [
        { text: "Material", value: "item_name", width: 200 },
        { text: "Unit", value: "item_unit", width: 200 },
        { text: "Price Buy /100", value: "price_buy", width: 200 },
        { text: "QTY", value: "qty", width: 150 },
        { text: "Total Price", value: "total_price", width: 200 },
        { text: "Remark", value: "remark", width: 100 },
        { text: "Action", value: "action", sortable: false, width: 100 },
      ],
      expanded: [],
      loading: false,
    };
  },
  methods: {
    ...mapMutations("purchase_order", [
      "SET_TOTAL",
      "SET_SUBTOTAL",
      "SET_DISCOUNT",
      "SET_VAT",
      "SET_PPH",
    ]),

    ...mapMutations("purchase_order", ["CLEAR_FORM"]),
    selectProduct(val) {
      if (this.PurchaseOrder.product_list.find((item) => item.product_id === val.id)) {
        this.PurchaseOrder.product_list.find((item) => item.product_id === val.id).qty++;
        return;
      }
      this.$store.commit("purchase_order/SET_PRODUCT_LIST", val);
    },
    removeProduct(index) {
      this.PurchaseOrder.product_list.splice(index, 1);
    },

    selectItem(val) {
      if (this.PurchaseOrder.item_list.find((item) => item.id === val.id)) {
        this.PurchaseOrder.item_list.find((item) => item.id === val.id).qty++;
        return;
      }
      this.$store.commit("purchase_order/SET_ITEM_LIST", val);
    },
    removeItem(index) {
      this.PurchaseOrder.item_list.splice(index, 1);
    },

    dataTableRowClicked(item) {
      if (item === this.expanded[0]) {
        this.expanded = [];
      } else {
        this.expanded = [item];
      }
    },
    openProductDialog() {
      this.dialogProduct = true;
    },
    closeProductDialog() {
      this.dialogProduct = false;
    },
    openItemDialog() {
      this.dialogItem = true;
    },
    closeItemDialog() {
      this.dialogItem = false;
    },

    clearForm() {
      this.CLEAR_FORM();
    },
  },

  computed: {
    ...mapGetters("purchase_order", {
      PurchaseOrder: "PurchaseOrder",
    }),
    ...mapGetters("pph", {
      PPH: "Pph",
    }),

    subtotal() {
      return this.SET_SUBTOTAL(this.sub_total ? this.sub_total : 0);
    },

    sub_total() {
      if (this.PurchaseOrder.type === "MATERIAL") {
        return _.sumBy(this.PurchaseOrder.item_list, function (t) {
          let total = (t.price_buy * t.qty) / 100;
          return total;
        });
      } else {
        return _.sumBy(this.PurchaseOrder.product_list, function (t) {
          let total = (t.price_buy * t.qty) / 100;
          return total;
        });
      }
    },
    discount() {
      if (
        this.PurchaseOrder.discount_percent > 100 ||
        this.PurchaseOrder.discount_percent < 0
      ) {
        this.SET_DISCOUNT(0);
        return "Discount not valid value";
      }
      this.SET_DISCOUNT(
        (this.sub_total * this.PurchaseOrder.discount_percent) / 100
      );
      return (this.sub_total * this.PurchaseOrder.discount_percent) / 100;
    },
    afterDiscount() {
      let discount = this.sub_total - this.discount;
      if (discount > 0) {
        return discount;
      } else {
        return 0;
      }
    },
    tax() {
      if (this.PurchaseOrder.use_vat) {
        this.SET_VAT((this.afterDiscount * 11) / 100);
        return (this.afterDiscount * 11) / 100;
      } else {
        this.SET_VAT(0);
        return 0;
      }
    },
    pph() {
      let pph = this.PPH.percentage ?? 0;
      this.SET_PPH((this.afterDiscount * pph) / 100 ?? 0);
      return (
        (this.afterDiscount * pph ?? 0) / 100
      );
    },

    total() {
      this.SET_TOTAL(this.afterDiscount + this.tax);
      return this.afterDiscount + this.tax;
    },
  },

  destroyed() {
    this.$store.commit("pph/CLEAR_PPH");
  },
  components: {
    "product-modal": ProductModal,
    "item-modal": ItemModal,
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