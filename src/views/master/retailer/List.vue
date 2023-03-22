<template>
  <div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="RETAILERS.data"
      class="elevation-1"
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
        <v-icon color="warning" class="mr-2" @click.stop="edit(item)">
          mdi-pencil-box-outline
        </v-icon>
      </template>

      <template v-slot:[`item.email`]="{ item }">
        <span class="primary--text">{{ item.email ?? "N/A" }}</span>
      </template>
      <template v-slot:[`item.phone`]="{ item }">
        <b>{{ item.phone ?? "N/A" }}</b>
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
import BaseColumn from "@/components/base/BaseColumn";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "SupplierList",
  data() {
    return {
      headers: [
        { text: "Retailer Name", value: "name" },
        { text: "EMail", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Retailer Address", value: "address" },
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
    };
  },

  created() {
    this.getRetailer();
  },
  methods: {
    ...mapMutations("retailer", ["SET_RETAILERS", "SET_CURRENT_PAGE"]),
    ...mapActions("retailer", ["clearRetailers"]),
    async getRetailer() {
      this.loading = true;
      this.disabled = true;
      let params = {
        page: this.page,
        status: this.search.status,
        keyword: this.search.keyword,
      };

      await this.$axios
        .get("/retailer", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_RETAILERS(data.retailers);
          this.loading = false;
          this.disabled = false;
        });
    },

    searching() {
      this.page = 1;
      this.getRetailer();
    },
    clear() {
      this.page = 1;
      this.search = {
        status: "",
        search: "",
      };
      this.getRetailer();
    },

    dataTableRowClicked(item) {
      if (item === this.expanded[0]) {
        this.expanded = [];
      } else {
        this.expanded = [item];
      }
    },

    edit(item) {
      this.$router.push("/master/retailers/edit/" + item.id);
    },
  },
  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.getRetailer();
    },
  },
  computed: {
    ...mapGetters("retailer", {
      RETAILERS: "Retailers",
    }),

    currentPage: {
      get() {
        return this.RETAILERS.current_page;
      },
      set(val) {
        return this.SET_CURRENT_PAGE(val);
      },
    },
    lastPage: {
      get() {
        return this.RETAILERS.last_page;
      },
    },
  },

  destroyed() {
    this.clearRetailers();
  },

  components: {
    BaseColumn,
  },
};
</script>