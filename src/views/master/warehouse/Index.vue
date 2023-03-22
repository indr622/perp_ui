<template>
  <div>
    <base-title title="Warehouse" subtitle="List Data Warehouse" />
    <v-data-table
      :headers="headers"
      :items="WAREHOUSE.data"
      item-key="id"
      sort-by="name"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
      hide-default-footer
    >
      <template v-slot:[`item.is_active`]="{ item }">
        <v-icon v-if="item.is_active == 1" color="success">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
      </template>
      <template v-slot:no-data> No data </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="warning" class="mr-2" @click.stop="editItem(item)">
          mdi-pencil-box-outline
        </v-icon>
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
          <base-column :lg="2" :md="2" :sm="6">
            <v-select
              class="mt-6"
              :items="status"
              outlined
              dense
              attach
              chips
              label="Status"
              v-model="search.status"
            ></v-select
          ></base-column>
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
          <v-btn
            v-on="on"
            small
            elevation="5"
            color="primary"
            to="/master/warehouse/create"
          >
            Create
            <v-icon right dark>mdi-plus-circle </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-pagination
      v-model="currentPage"
      :length="lastPage"
      :total-visible="10"
      :disabled="disabled"
    ></v-pagination>
  </div>
</template>

<script>
import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters } from "vuex";
export default {
  name: "WarehouseView",
  components: { BaseTitle, BaseColumn },
  data: () => ({
    headers: [
      { text: "Warehouse ", value: "name" },
      { text: "Email ", value: "email" },
      { text: "Telephone ", value: "phone" },
      { text: "Address", value: "address" },
      { text: "Status", value: "is_active" },
      { text: "AKSI", value: "actions", sortable: false, width: 100 },
    ],
    form_valid: true,
    btnLoading: false,
    dialogForm: false,
    form_data: {
      name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      is_active: true,
    },
    page: 1,
    disabled: false,
    loading: false,
    status: ["Active", "Inactive"],
    search: {
      status: null,
      keyword: null,
    },
    expanded: [],
    editedIndex: -1,
    rule_name: [(value) => !!value || "Warehouse name please fill in !!!"],
    rule_description: [
      (value) => !!value || "Warehouse description please fill in",
    ],
    rule_address: [(value) => !!value || "Warehouse Address please fill in"],
  }),

  created() {
    this.getWarehouse();
  },

  methods: {
    getWarehouse: async function () {
      this.loading = true;
      await this.$axios
        .get("/warehouse", {
          headers: { Authorization: this.$store.getters["auth/Token"] },
        })
        .then(({ data }) => {
          this.$store.commit("warehouse/SET_WAREHOUSE", data.warehouse);
          this.loading = false;
          this.disabled = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    editItem(item) {
      this.id = item.id;
      this.$router.push({ name: "warehouse.edit", params: { id: item.id } });
    },
  },
  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.getWarehouse();
    },
  },
  computed: {
    ...mapGetters("warehouse", {
      WAREHOUSE: "Warehouse",
    }),

    currentPage: {
      get() {
        return this.WAREHOUSE.current_page;
      },
      set(val) {
        return this.$store.commit("warehouse/SET_CURRENT_PAGE", val);
      },
    },
    lastPage: {
      get() {
        return this.WAREHOUSE.last_page;
      },
    },
    form_title() {
      return this.editedIndex === -1 ? "Create Warehouse" : "Edit Warehouse";
    },
  },
};
</script>