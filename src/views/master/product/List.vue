<template>
  <div>
    <v-data-table :loading="loading" :headers="headers" :items="PRODUCTS.data" class="elevation-1" show-expand
      :expanded.sync="expanded" :single-expand="true" @click:row="dataTableRowClicked" hide-default-footer>
      <template v-slot:[`item.is_active`]="{ item }">
        <v-icon v-if="item.is_active == 1" color="success">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
      </template>
      <template v-slot:no-data> No data </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="warning" class="mr-2" @click.stop="edit(item)">
          mdi-pencil-box-outline
        </v-icon>
      </template>

      <template v-slot:[`item.pillow_bag`]="{ item }">
        {{ item.pillow_bag ? item.pillow_bag : "N/A" }}
      </template>
      <template v-slot:[`item.gusset`]="{ item }">
        <strong class="error--text">{{
          item.gusset ? item.gusset : "N/A"
        }}</strong>
      </template>
      <template v-slot:[`item.airhole`]="{ item }">
        <strong class="error--text">{{
          item.airhole ? item.airhole : "N/A"
        }}</strong>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col cols="12" class="mt-5">
              <h4 class="mb-1">
                Description : {{ item.description ? item.description : "N/A" }}
              </h4>
              <hr />
              <h4 class="mb-1">
                Printing : {{ item.printing ? "Yes" : "No" }}
              </h4>
              <hr />
              <h4 class="mb-1">
                Printing : {{ item.perforation ? "Yes" : "No" }}
              </h4>
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
          <base-column :lg="2" :md="2" :sm="6">
            <v-select class="mt-6" :items="status" outlined dense attach chips label="Status"
              v-model="search.status"></v-select></base-column>
          <v-btn small color="darkblue" class="white--text float-end mx-1" @click.stop="searching">Submit <v-icon
              right>mdi-magnify</v-icon></v-btn>
          <v-btn small color="secondary" class="white--text float-end mx-1" @click.stop="clear">Clear
            <v-icon right>mdi-close-circle-multiple </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10" :disabled="disabled"></v-pagination>
  </div>
</template>


<script>
import BaseColumn from "@/components/base/BaseColumn";
import { mapGetters } from "vuex";
export default {
  name: "CustomerList",
  data() {
    return {
      headers: [
        { text: "Retailer Name", value: "retailer.name" },
        { text: "Item Code", value: "name" },
        { text: "Thickness", value: "thick" },
        { text: "Width", value: "width" },
        { text: "Length", value: "length" },
        { text: "Flap", value: "flap" },
        { text: "Gusset", value: "gusset" },
        { text: "Pillow Bag", value: "pillow_bag" },
        { text: "Pillow Fold", value: "pillow_fold" },
        { text: "Air Hole", value: "airhole" },
        { text: "Sealtape", value: "sealtape" },
        { text: "Price Source", value: "price" },
        { text: "Price Buy", value: "price_buy" },
        { text: "Status", value: "is_active" },
        { text: "Action", value: "actions", sortable: false, width: 100 },
      ],
      page: 1,
      disabled: false,
      loading: false,
      status: ["Active", "Inactive"],
      search: {
        status: null,
        keyword: null,
      },
      expanded: [],
    };
  },

  created() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      this.loading = true;
      this.disabled = true;
      let params = {
        page: this.page,
        status: this.search.status,
        keyword: this.search.keyword,
      };

      await this.$axios
        .get("/product", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
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

    dataTableRowClicked(item) {
      if (item === this.expanded[0]) {
        this.expanded = [];
      } else {
        this.expanded = [item];
      }
    },

    edit(item) {
      this.$router.push("/master/product/edit/" + item.id);
    },
  },
  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.getProduct();
    },
  },
  computed: {
    ...mapGetters("product", {
      PRODUCTS: "Products",
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

  destroyed() {
    this.$store.dispatch("product/clearProducts");
  },

  components: {
    BaseColumn,
  },
};
</script>