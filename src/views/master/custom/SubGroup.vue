<template>
  <div>
    <base-title title="Sub Group" subtitle="List Data Sub Group" />
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
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-col cols="12">
            <strong>Group Name:</strong>{{ item.group.name }}
          </v-col>
        </td>
      </template>
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
                elevation="1"
                color="primary"
                class="ma-2 white--text"
                @click.stop="addItem"
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
                    label="Sub Grou Name"
                    outlined
                    dense
                    :rules="rule_name"
                  >
                  </v-text-field>
                  <v-select
                    v-model="form_data.group"
                    label="Group Name"
                    :items="list_group"
                    item-text="name"
                    item-value="id"
                    return-object
                    dense
                    outlined
                    :rules="rule_group"
                  >
                  </v-select>
                  <v-textarea
                    v-model="form_data.description"
                    label="Description"
                    outlined
                    dense
                    rows="3"
                    :rules="rule_description"
                  >
                  </v-textarea>
                  <v-switch dense v-model="form_data.is_active" label="USE">
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
  components: { BaseTitle },
  name: "GroupView",

  mixins: [datatableMixin],

  data: () => ({
    headers: [
      { text: "Sub Group", value: "name" },
      { text: "Description", value: "description" },
      { text: "Status", value: "is_active" },
      { text: "AKSI", value: "actions", sortable: false, width: 100 },
    ],

    list_group: [],
    form_data: {
      name: "",
      group: "",
      description: "",
      is_active: true,
    },
    form_default: {
      name: "",
      group: "",
      description: "",
      is_active: true,
    },
  }),

  methods: {
    initialize: async function () {
      this.datatableLoading = true;
      await this.$axios
        .get("/subgroups", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.datatable = data.sub_groups;
          this.datatableLoading = false;
        })
        .catch(() => {
          this.datatableLoading = false;
        });
    },

    addItem() {
      this.$axios
        .get("/groups", {
          headers: { Authorization: this.$store.getters["auth/Token"] },
        })
        .then(({ data }) => {
          this.list_group = data.groups;
        });
      this.dialogfrm = true;
    },

    save: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        if (this.editedIndex > -1) {
          await this.$axios
            .post(
              "/subgroups/" + this.form_data.id,
              {
                _method: "PUT",
                name: this.form_data.name,
                group_id: this.form_data.group.id,
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
              Object.assign(this.datatable[this.editedIndex], data.sub_groups);
              this.closedialogForm();
              this.btnLoading = false;
            })
            .catch(() => {
              this.btnLoading = false;
            });
        } else {
          await this.$axios
            .post(
              "/subgroups",
              {
                name: this.form_data.name,
                group_id: this.form_data.group.id,
                description: this.form_data.description,
                is_active: this.form_data.is_active,
              },
              {
                headers: {
                  Authorization: this.$store.getters["auth/Token"],
                },
              }
            )
            .then(() => {
              this.closedialogForm();
              this.btnLoading = false;
              this.initialize();
            })
            .catch(() => {
              this.btnLoading = false;
            });
        }
      }
    },

    editItem(item) {
      this.id = item.id;
      this.editedIndex = this.datatable.indexOf(item);
      this.form_data = Object.assign({}, item);
      this.$axios
        .get("/groups", {
          headers: { Authorization: this.$store.getters["auth/Token"] },
        })
        .then(({ data }) => {
          this.list_group = data.groups;
        });

      this.dialogForm = true;
    },
  },
  computed: {
    form_title() {
      return this.editedIndex === -1 ? "Create Sub Group" : "Edit Sub Group";
    },
  },
};
</script>