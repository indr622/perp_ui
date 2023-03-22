<template>
  <div>
    <!-- product list -->
    <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
      <v-toolbar-title> Product List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined small class="ma-1" color="primary" @click="openProductDialog(Quotation.retailer_id)"
        v-if="Quotation.retailer_id">
        Add Product
        <v-icon right>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-simple-table class="mx-2 mb-3" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" width="1%">#</th>
            <th class="text-left" width="12%">No Sales Order</th>
            <th class="text-left" width="12%">Customer</th>
            <th class="text-left" width="15%">Product Name</th>
            <th class="text-left" width="9%">Item Name</th>
            <th class="text-left" width="7%">Unit</th>
            <th class="text-left" width="7%">Qty</th>
            <th class="text-left" width="10%">Remark</th>
            <th class="text-left" width="5%">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr height="80" v-for="(row, index) in Quotation.product_list" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              {{ row.product_name ?? row.product.name }}

              <br />
              <v-chip small color="primary" text-color="white">
                Thick :{{ row.thick ?? row.product.thick }}
              </v-chip>
              <v-chip small color="primary" text-color="white">
                Width :{{ row.width ?? row.product.width }}
              </v-chip>
              <v-chip small color="primary" text-color="white">
                Length :{{ row.length ?? row.product.length }}
              </v-chip>
              <v-chip small color="primary" text-color="white">
                Tape :{{ row.sealtape ?? row.product.sealtape }}
              </v-chip>
              <v-chip small color="primary" text-color="white">
                Print :{{ row.printing ?? row.product.printing }}
              </v-chip>
            </td>
            <td>
              <b> {{ row.item_name ?? row.product.item.name }} </b>
            </td>
            <td>{{ row.unit_name ?? row.product.unit.name }}</td>
            <td>
              <b> {{ row.price ?? row.product.price | currency("", 2, { symbolOnLeft: false }) }}
              </b>
            </td>
            <td>
              <v-text-field type="number" v-model="row.price_sell" placeholder="Price Sell" outlined dense
                hide-details></v-text-field>
            </td>
            <td>
              <v-text-field v-model="row.qty" placeholder="Qty" type="number" outlined dense hide-details></v-text-field>
            </td>
            <td>
              <b>
                {{ row.amount = (row.price_sell * row.qty) / 100 }}
              </b>
            </td>
            <td>
              <v-textarea v-model="row.remark" dense outlined rows="1" hide-details placeholder="Remark"></v-textarea>
            </td>
            <td>
              <v-icon color="error" @click="removeProduct(index)">mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-simple-table class="mx-2 mb-3" fixed-header>
      <thead>
        <tr>
          <th class="text-left" width="45%"></th>
          <th class="text-left" width="10%"></th>
          <th class="text-left" width="10%"></th>
          <th class="text-left" width="20%"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><v-btn color="primary" small> <v-icon>mdi-plus</v-icon>Add From Sales Order</v-btn> </td>
          <td></td>
          <td class="text-right">
            <h3>Total Qty :</h3>
          </td>
          <td>
            <b class="primary--text"> {{ total | currency("", 2, { symbolOnLeft: false }) }}</b>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-dialog v-model="dialogProduct" v-if="dialogProduct" max-width="1200px" persistent><products-modal
        v-on:closeProductDialog="closeProductDialog" v-on:selectProduct="selectProduct" />
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ProductsModal from "@/components/modal/ProductsModal.vue";

export default {
  name: "WorkOrderFormItem",
  data() {
    return {
      dialogProduct: false,
    };
  },
  methods: {
    ...mapMutations("quotation", [
      "SET_TOTAL",
    ]),

    openProductDialog() {
      this.dialogProduct = true;
    },
    closeProductDialog() {
      this.dialogProduct = false;
    },
    selectProduct(val) {
      if (this.Quotation.product_list.find((item) => item.product_id === val.id)) {
        this.Quotation.product_list.find((item) => item.product_id === val.id).qty++;
        return;
      }
      this.$store.commit("quotation/SET_PRODUCT_LIST", val);
      this.dialogProduct = false;
    },

    removeProduct(index) {
      this.Quotation.product_list.splice(index, 1);
    },
  },

  computed: {
    ...mapState("quotation", {
      Quotation: (state) => state.quotation,
    }),

    total() {
      this.SET_TOTAL(this.afterDiscount + this.tax + this.Quotation.additional_cost);
      return this.afterDiscount + this.tax + this.Quotation.additional_cost
    },
  },

  components: {
    "products-modal": ProductsModal,
  },
};
</script>
