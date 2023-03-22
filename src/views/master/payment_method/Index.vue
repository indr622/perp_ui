<template>
  <div>
    <base-title title="Payment Methods" subtitle="List Data Payment Methods" />

    <v-data-table
      :headers="headers"
      :items="datatable"
      :search="search"
      item-key="id"
      sort-by="name"
      class="elevation-1"
      :loading="datatableLoading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.is_active`]="{ item }">
        <v-chip x-small :color="getColor(item.is_active)" dark>
          {{ item.is_active ? "Active" : "Not Active" }}
        </v-chip></template
      >
      <template v-slot:no-data> No data </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="warning" class="mr-2" @click.stop="editItem(item)">
          mdi-pencil-box-outline
        </v-icon>
      </template>

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search Data"
            dense
            outlined
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogForm" max-width="500px" persistent>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                small
                elevation="1"
                color="primary"
                class="ma-2 white--text"
                @click="loader = 'loading3'"
              >
                Create
                <v-icon right dark>mdi-plus-circle </v-icon>
              </v-btn>
            </template>
            <v-form ref="form_data" v-model="form_valid" lazy-validation>
              <v-card class="rounded-lg">
                <v-card-title class="mb-3">
                  <span class="headline">{{ form_title }}</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="form_data.name"
                    label="Payment Method Name"
                    outlined
                    dense
                    :rules="rule_name"
                  >
                  </v-text-field>
                  <v-textarea
                    dense
                    v-model="form_data.description"
                    label="Description"
                    outlined
                    rows="2"
                    :rules="rule_description"
                  >
                  </v-textarea>
                  <v-switch v-model="form_data.is_active" label="USE">
                  </v-switch>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error darken-1"
                    @click.stop="closedialogForm"
                    small
                    >Cancel
                    <v-icon right dark>mdi-close </v-icon>
                  </v-btn>
                  <v-btn
                    small
                    color="primary"
                    class="ma-2 white--text"
                    @click.stop="save"
                    :loading="btnLoading"
                    :disabled="!form_valid || btnLoading"
                  >
                    Save
                    <v-icon right dark>mdi-content-save </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { datatableMixin } from "@/mixins/datatable.js";
import BaseTitle from "@/components/base/BaseTitle.vue";

export default {
  name: "PaymentMethodView",
  components: { BaseTitle },
  mixins: [datatableMixin],
  data: () => ({
    headers: [
      { text: "Payment Method ", value: "name" },
      { text: "Description", value: "description" },
      { text: "Status", value: "is_active" },
      { text: "AKSI", value: "actions", sortable: false, width: 100 },
    ],

    form_data: {
      name: "",
      description: "",
      is_active: true,
    },
    form_default: {
      name: "",
      description: "",
      is_active: true,
    },

    rule_name: [(value) => !!value || "Payment Method name please fill in !!!"],
    rule_description: [
      (value) => !!value || "Payment Method description please fill in",
    ],
  }),

  methods: {
    initialize: async function () {
      this.datatableLoading = true;
      await this.$axios
        .get("/payment_method", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.datatable = data.payment_methods;
          this.datatableLoading = false;
        })
        .catch(() => {
          this.datatableLoading = false;
        });
    },

    save: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        if (this.editedIndex > -1) {
          await this.$axios
            .post(
              "/payment_method/" + this.form_data.id,
              {
                _method: "PUT",
                name: this.form_data.name,
                description: this.form_data.description,
                is_active: this.form_data.is_active,
              },
              {
                headers: {
                  Authorization: this.$store.getters["auth/Token"],
                },
              }
            )
            .then(({ data }) => {
              Object.assign(
                this.datatable[this.editedIndex],
                data.payment_methods
              );
              this.closedialogForm();
              this.btnLoading = false;
            })
            .catch(() => {
              this.btnLoading = false;
            });
        } else {
          await this.$axios
            .post(
              "/payment_method",
              {
                name: this.form_data.name,
                description: this.form_data.description,
                is_active: this.form_data.is_active,
              },
              {
                headers: {
                  Authorization: this.$store.getters["auth/Token"],
                },
              }
            )
            .then(({ data }) => {
              this.datatable.push(data.payment_methods);
              this.closedialogForm();
              this.btnLoading = false;
            })
            .catch(() => {
              this.btnLoading = false;
            });
        }
      }
    },
  },
  computed: {
    form_title() {
      return this.editedIndex === -1
        ? "Create Payment Method"
        : "Edit Payment Method";
    },
  },
};
</script>