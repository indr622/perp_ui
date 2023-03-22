<template>
  <div>
    <v-card-title>Role </v-card-title>
    <v-card-subtitle>List Data Role</v-card-subtitle>
    <v-spacer></v-spacer>
    <v-data-table
      :headers="headers"
      :items="datatable"
      :search="search"
      item-key="id"
      sort-by="created_at"
      class="elevation-1"
      :loading="datatableLoading"
      loading-text="Please wait..."
    >
      <template v-slot:[`item.guard_name`]="{ item }">
        <v-chip x-small :color="getColor(item.guard_name)" dark>
          {{ item.guard_name ? "API" : "DEFAULT" }}
        </v-chip></template
      >
      <template v-slot:no-data> No data </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="text-center">
          <v-col cols="12"> <strong>ID:</strong>{{ item.id }} </v-col>
        </td>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip color="dark" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              :loading="btnLoading"
              :disabled="btnLoading"
              @click.stop="setPermissions(item)"
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              mdi-shield-account
            </v-icon>
          </template>
          <span>Set Permissions</span>
        </v-tooltip>

        <v-tooltip color="dark" bottom>
          <template v-slot:activator="{ on, attrs }" v-if="item.id !== 1">
            <v-icon
              color="warning"
              v-bind="attrs"
              v-on="on"
              class="mr-2"
              @click.stop="editItem(item)"
            >
              mdi-pencil-box-outline
            </v-icon>
          </template>
          <span>Edit Role</span>
        </v-tooltip>
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
          <v-dialog v-model="dialogForm" max-width="400px" persistent>
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
                    label="Role Name"
                    outlined
                    dense
                    :rules="rule_name"
                  >
                  </v-text-field>
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

export default {
  name: "RoleView",
  mixins: [datatableMixin],
  data: () => ({
    headers: [
      { text: "Role Name", value: "name" },
      { text: "Description", value: "guard_name" },
      { text: "Action", value: "actions", sortable: false, width: 100 },
    ],
    form_data: {
      name: "",
      guard_name: "api",
    },
    form_default: {
      name: "",
      guard_name: "api",
    },

    editedItem: {
      id: 0,
      name: "",
      guard: "",
    },
    editedIndex: -1,
    rule_name: [(value) => !!value || "Role name please fill in !!!"],
  }),

  methods: {
    initialize: async function () {
      this.datatableLoading = true;
      await this.$axios
        .get("/role", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.datatable = data.roles;
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
              "/role/" + this.form_data.id,
              {
                _method: "PUT",
                name: this.form_data.name,
                guard_name: this.form_data.guard_name,
              },
              {
                headers: {
                  Authorization: this.$store.getters["auth/Token"],
                },
              }
            )
            .then(({ data }) => {
              Object.assign(this.datatable[this.editedIndex], data.roles);
              this.closedialogForm();
              this.btnLoading = false;
            })
            .catch(() => {
              this.btnLoading = false;
            });
        } else {
          await this.$axios
            .post(
              "/role",
              {
                name: this.form_data.name,
                guard_name: this.form_data.guard_name,
              },
              {
                headers: {
                  Authorization: this.$store.getters["auth/Token"],
                },
              }
            )
            .then(({ data }) => {
              this.datatable.push(data.roles);
              this.closedialogForm();
              this.btnLoading = false;
            })
            .catch(() => {
              this.btnLoading = false;
            });
        }
      }
    },

    dataTableRowClicked(item) {
      if (item === this.expanded[0]) {
        this.expanded = [];
      } else {
        this.expanded = [item];
      }
    },

    setPermissions(item) {
      this.$router.push("/master/permission/" + item.id);
    },

    editItem(item) {
      this.id = item.id;
      this.editedIndex = this.datatable.indexOf(item);
      this.form_data = Object.assign({}, item);
      this.dialogForm = true;
    },

    closedialogForm() {
      this.dialogForm = false;
      setTimeout(() => {
        this.form_data = Object.assign({}, this.form_default);
        this.$refs.form_data.reset();
        this.editedIndex = -1;
      }, 300);
    },

    getColor(guard_name) {
      if (guard_name == "api") return "success";
      return "error";
    },
  },
  computed: {
    form_title() {
      return this.editedIndex === -1 ? "Create Role" : "Edit Role";
    },
  },
};
</script>