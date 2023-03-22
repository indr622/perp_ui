<template>
  <v-card>
    <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
      <v-toolbar-title> Produc List </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeProductDialog" color="error" outlined small>
        <v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>

    <v-data-table :loading="loading" :headers="headers" :items="PRODUCTS.data" class="elevation-1" hide-default-footer
      show-expand :expanded.sync="expanded" :single-expand="true" @click:row="dataTableRowClicked">
      <template v-slot:no-data> No data </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" outlined small @click.stop="selectProduct(item)">Select <v-icon right> mdi-check
          </v-icon></v-btn>
      </template>

      <template v-slot:[`item.is_active`]="{ item }">
        <v-icon v-if="item.is_active == 1" color="success">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
      </template>
      <template v-slot:[`item.printing`]="{ item }">
        <v-icon v-if="item.printing == 1" color="success">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
      </template>
      <template v-slot:[`item.perforation`]="{ item }">
        <v-icon v-if="item.perforation == 1" color="success" class="text-center">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col cols="12" class="mt-5">
              <p class="mb-1">
                <span><strong>Description :</strong> </span>
                {{ item.description ? item.description : "N/A" }}
              </p>
              <hr />
            </v-col>
          </v-row>
        </td>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <base-column :lg="4" :md="4" :sm="6">
            <v-text-field v-model="search.keyword" append-icon="mdi-magnify" label="Search Data" outlined dense
              hide-details></v-text-field>
          </base-column>

          <v-btn small color="darkblue" class="white--text float-end mx-1" @click.stop="searching">Submit <v-icon
              right>mdi-magnify</v-icon></v-btn>
          <v-btn small color="secondary" class="white--text float-end mx-1" @click.stop="clear">Clear
            <v-icon right>mdi-close-circle-multiple </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template>
        <v-icon color="warning" class="mr-2"> mdi-pencil-box-outline </v-icon>
      </template>
    </v-data-table>

    <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10" :disabled="disabled"></v-pagination>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
export default {
  name: "ProductsModal",

  created() {
    this.getProduct();
  },

  data() {
    return {
      headers: [
        { text: "Item Code", value: "name" },
        { text: "Thickness", value: "thick" },
        { text: "Width", value: "width" },
        { text: "Length", value: "length" },
        { text: "Flap", value: "flap" },
        { text: "Gusset", value: "gusset" },
        { text: "Pillow Bag", value: "pillow_bag" },
        { text: "Pillow Fold", value: "pillow_fold" },
        { text: "Air Hole", value: "airhole" },
        { text: "Price Source", value: "price" },
        { text: "Perforation", value: "perforation" },
        { text: "Printing", value: "printing" },
        { text: "Status", value: "is_active" },
        { text: "Action", value: "actions", sortable: false, width: 100 },
      ],
      expanded: [],
      loading: false,
      disabled: false,
      search: {
        keyword: null,
        retailer: null,
        status: "Active",
      },
    };
  },
  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.getProduct();
    },
  },
  methods: {
    async getProduct() {
      this.loading = true;
      let params = {
        keyword: this.search.keyword,
        status: this.search.status,
        retailer: this.RETAILER.id,
      };
      await this.$axios("/product", {
        params: params,
        headers: {
          Authorization: this.$store.getters["auth/Token"],
        },
      }).then(({ data }) => {
        this.$store.commit("product/SET_PRODUCTS", data.products);
        this.loading = false;
        this.disabled = false;
      });
    },
    searching() {
      this.page = 1;
      this.getProduct();
    },
    clear() {
      this.page = 1;
      this.search = {
        status: "",
        search: "",
      };
      this.getProduct();
    },
    closeProductDialog() {
      this.$emit("closeProductDialog");
    },

    selectProduct(item) {
      this.$emit("selectProduct", item);
      this.closeProductDialog();
    },

    removeProduct(item) {
      this.$emit("removeProduct", item);
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
    ...mapGetters("product", {
      PRODUCTS: "Products",
    }),
    ...mapGetters("retailer", {
      RETAILER: "Retailer",
    }),
    currentPage: {
      get() {
        return this.PRODUCTS.current_page;
      },
      set(val) {
        return this.$store.commit("product/SET_CURRENT_PAGE", val);
      },
    },
    lastPage: {
      get() {
        return this.PRODUCTS.last_page;
      },
    },
  },

  components: {
    BaseColumn,
  },
};
</script>