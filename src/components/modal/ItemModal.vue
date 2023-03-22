<template>
  <v-card>
    <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
      <v-toolbar-title> Material List </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeItemDialog" color="error" outlined small>
        <v-icon>mdi-close</v-icon></v-btn
      >
    </v-app-bar>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="ITEMS.data"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:no-data> No data </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" outlined small @click.stop="selectItem(item)"
          >Select <v-icon right> mdi-check </v-icon></v-btn
        >
      </template>

      <template v-slot:[`item.is_active`]="{ item }">
        <v-icon v-if="item.is_active == 1" color="success">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
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
import { mapGetters } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
export default {
  name: "ItemModal",

  created() {
    this.getItem();
  },

  data() {
    return {
      headers: [
        { text: "Sub Group", value: "subgroup.name" },
        { text: "Material Name", value: "name" },
        { text: "Unit Name", value: "unit.name" },
        { text: "Status", value: "is_active" },
        { text: "AKSI", value: "actions", sortable: false, width: 100 },
      ],
      page: 1,
      disabled: false,
      loading: false,
      status: ["Active", "Inactive"],
      search: {
        status: "Active",
        keyword: null,
      },
    };
  },

  methods: {
    async getItem() {
      this.loading = true;
      this.disabled = true;
      let params = {
        page: this.page,
        status: this.search.status,
        keyword: this.search.keyword,
      };

      await this.$axios
        .get("/item", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.$store.commit("item/SET_ITEMS", data.items);
          this.loading = false;
          this.disabled = false;
        });
    },

    searching() {
      this.page = 1;
      this.getItem();
    },
    clear() {
      this.page = 1;
      this.search = {
        status: "",
        search: "",
      };
      this.getItem();
    },
    closeItemDialog() {
      this.$emit("closeItemDialog");
    },

    selectItem(item) {
      
      this.$emit("selectItem", item);
      this.closeItemDialog();
    },

    removeItem(item) {
      this.$emit("removeItem", item);
    },
    dataTableRowClicked(item) {
      if (item === this.expanded[0]) {
        this.expanded = [];
      } else {
        this.expanded = [item];
      }
    },
  },
  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.getItem();
    },
  },
  computed: {
    ...mapGetters("item", {
      ITEMS: "Items",
    }),
    ...mapGetters("auth", {
      TOKEN: "Token",
    }),

    currentPage: {
      get() {
        return this.ITEMS.current_page;
      },
      set(val) {
        return this.$store.commit("item/SET_CURRENT_PAGE", val);
      },
    },
    lastPage: {
      get() {
        return this.ITEMS.last_page;
      },
    },
  },

  components: {
    BaseColumn,
  },
};
</script>