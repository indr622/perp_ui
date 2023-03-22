<template>
  <v-card>
    <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
      <v-toolbar-title> Supplier List </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeSupplierDialog" color="error" outlined small>
        <v-icon>mdi-close</v-icon></v-btn
      >
    </v-app-bar>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="SUPPLIERS.data"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:no-data> No data </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" outlined small @click.stop="selectSupplier(item)"
          >Select <v-icon right> mdi-check </v-icon></v-btn
        >
      </template>

      <template v-slot:[`item.is_active`]="{ item }">
        <v-icon v-if="item.is_active == 1" color="success">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
      </template>

      <template>
        <v-icon color="warning" class="mr-2"> mdi-pencil-box-outline </v-icon>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <base-column :lg="4" :md="4" :sm="6">
            <v-text-field
              v-model="search.keyword"
              append-icon="mdi-magnify"
              label="Search Data"
              outlined
              dense
              hide-details
            ></v-text-field>
          </base-column>

          <v-btn
            small
            color="darkblue"
            class="white--text float-end mx-1"
            @click.stop="searching"
            >Submit <v-icon right>mdi-magnify</v-icon></v-btn
          >
          <v-btn
            small
            color="secondary"
            class="white--text float-end mx-1"
            @click.stop="clear"
            >Clear
            <v-icon right>mdi-close-circle-multiple </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-pagination
      v-model="currentPage"
      :length="lastPage"
      :total-visible="10"
      :disabled="disabled"
    ></v-pagination>
  </v-card>
</template>

<script>
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters } from "vuex";
export default {
  name: "SupplierModalView",

  created() {
    this.getSupplier();
  },

  data() {
    return {
      headers: [
        { text: "Suppier Name", value: "name" },
        { text: "Email", value: "name" },
        { text: "Phone", value: "name" },
        { text: "Address", value: "address" },
        { text: "Status", value: "is_active" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      page: 1,
      disabled: false,
      loading: false,
      search: {
        keyword: null,
        status: "Active",
      },
    };
  },

  methods: {
    async getSupplier() {
      this.loading = true;
      this.disabled = true;
      let params = {
        page: this.page,
        status: this.search.status,
        keyword: this.search.keyword,
      };
      await this.$axios("/supplier", {
        params: params,
        headers: {
          Authorization: this.$store.getters["auth/Token"],
        },
      }).then(({ data }) => {
        this.$store.commit("supplier/SET_SUPPLIERS", data.suppliers);

        this.loading = false;
        this.disabled = false;
      });
    },
    searching() {
      this.page = 1;
      this.getSupplier();
    },
    clear() {
      this.page = 1;
      this.search = {
        status: "",
        search: "",
      };
      this.getSupplier();
    },

    closeSupplierDialog() {
      this.$emit("closeSupplierDialog");
    },

    selectSupplier(item) {
      this.$emit("selectSupplier", item);
      this.closeSupplierDialog();
    },
  },
  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.getSupplier();
    },
  },

  computed: {
    ...mapGetters("supplier", {
      SUPPLIERS: "Suppliers",
    }),
    currentPage: {
      get() {
        return this.SUPPLIERS.current_page;
      },
      set(val) {
        return this.$store.commit("supplier/SET_CURRENT_PAGE", val);
      },
    },
    lastPage: {
      get() {
        return this.SUPPLIERS.last_page;
      },
    },
  },

  destroyed() {
    this.$store.dispatch("supplier/clearState");
  },

  components: {
    BaseColumn,
  },
};
</script>