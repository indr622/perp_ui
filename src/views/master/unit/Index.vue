<template>
  <div>
    <base-title title="Unit" subtitle="List Data Unit" />
    <v-data-table
      :headers="headers"
      :items="datatable"
      :search="search"
      item-key="id"
      sort-by="name"
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
            outlined
            dense
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogForm" max-width="450px" persistent>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                small
                elevation="4"
                color="primary"
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
                    label="Unit Name"
                    outlined
                    dense
                    :rules="rule_name"
                  >
                  </v-text-field>
                  <v-textarea
                    v-model="form_data.description"
                    label="Description"
                    outlined
                    dense
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
                    small
                    color="error darken-1"
                    @click.stop="closedialogForm"
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
  name: "UnitView",
  components: { BaseTitle },
  mixins: [datatableMixin],
  data: () => ({
    headers: [
      { text: "Unit Name", value: "name" },
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
    editedIndex: -1,
    rule_name: [(value) => !!value || "Unit name please fill in !!!"],
    rule_description: [(value) => !!value || "Unit description please fill in"],
  }),

  methods: {
    initialize: async function () {
      this.datatableLoading = true;
      await this.$axios
        .get("/units", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.datatable = data.units;
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
            .post("/units/" + this.form_data.id, {
              _method: "PUT",
              name: this.form_data.name,
              description: this.form_data.description,
              is_active: this.form_data.is_active,
            })
            .then(({ data }) => {
              Object.assign(this.datatable[this.editedIndex], data.units);
              this.closedialogForm();
              this.btnLoading = false;
            })
            .catch(() => {
              this.btnLoading = false;
            });
        } else {
          await this.$axios
            .post(
              "/units",
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
              this.datatable.push(data.units);
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
      return this.editedIndex === -1 ? "Create Unit" : "Edit Unit";
    },
  },
};
</script>

 
