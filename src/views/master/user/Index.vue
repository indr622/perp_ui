<template>
  <div>
    <base-title title="Users" subtitle="List Data Users" />

    <v-data-table
      :headers="headers"
      :items="datatable"
      :search="search"
      item-key="id"
      sort-by="name"
      :loading="datatableLoading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:no-data> No data </template>
      <template v-slot:[`item.roles`]="{ item }">
        <v-chip small color="dark" dark>
          {{ item.roles[0].name }}
        </v-chip></template
      >
      <template v-slot:[`item.is_active`]="{ item }">
        <v-icon v-if="item.is_active == 1" color="success">
          mdi-check-circle
        </v-icon>
        <v-icon v-else color="error"> mdi-close-circle </v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip color="dark" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              color="warning"
              class="mr-2"
              @click.stop="editItem(item)"
            >
              mdi-pencil-box-outline
            </v-icon>
          </template>
          <span>Edit User</span>
        </v-tooltip>

        <v-tooltip color="dark" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="error"
              v-bind="attrs"
              v-on="on"
              class="mr-2"
              @click.stop="resetPassword(item)"
            >
              mdi-lock-clock
            </v-icon>
          </template>
          <span>Reset Password</span>
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
          <v-dialog v-model="dialogForm" max-width="600px" persistent>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                small
                elevation="1"
                color="primary"
                class="ma-2 white--text"
                @click.stop="addUser"
              >
                Create
                <v-icon right dark>mdi-plus-circle </v-icon>
              </v-btn>
            </template>
            <v-form ref="form_data" v-model="form_valid" lazy-validation>
              <v-card class="rounded-lg">
                <v-card-title class="mb-3">
                  <span class="headline">Add User</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="form_data.username"
                    label="Username"
                    outlined
                    dense
                    :rules="rule_username"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form_data.name"
                    label="Name"
                    outlined
                    dense
                    :rules="rule_name"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form_data.email"
                    label="Email Address"
                    outlined
                    dense
                    :rules="rule_email"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form_data.phone"
                    label="Phone Number"
                    outlined
                    dense
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form_data.password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    outlined
                    dense
                    @click:append="show = !show"
                  ></v-text-field>
                  <v-text-field
                    v-model="form_data.password_confirmation"
                    :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showConfirm ? 'text' : 'password'"
                    label="Confirm Password"
                    outlined
                    dense
                    @click:append="showConfirm = !showConfirm"
                  ></v-text-field>
                  <v-select
                    v-model="form_data.role"
                    label="Role Name"
                    :items="role_list"
                    item-text="name"
                    item-value="id"
                    return-object
                    dense
                    outlined
                  >
                  </v-select>
                  <v-switch dense v-model="form_data.is_active" label="USE">
                  </v-switch>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    color="error darken-1"
                    @click.stop="closedialogForm"
                    >Close
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

          <v-dialog v-model="dialogFormEdit" max-width="600px" persistent>
            <v-form ref="form_data" v-model="form_valid" lazy-validation>
              <v-card class="rounded-lg">
                <v-card-title class="mb-3">
                  <span class="headline">Edit User</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="form_data.username"
                    label="Username"
                    outlined
                    dense
                    :rules="rule_username"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form_data.name"
                    label="Name"
                    outlined
                    dense
                    :rules="rule_name"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form_data.email"
                    label="Email Address"
                    outlined
                    dense
                    :rules="rule_email"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form_data.phone"
                    label="Phone Number"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-switch dense v-model="form_data.is_active" label="USE">
                  </v-switch>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    color="error darken-1"
                    @click.stop="closedialogFormEdit"
                    >Close
                    <v-icon right dark>mdi-close </v-icon>
                  </v-btn>
                  <v-btn
                    small
                    color="primary"
                    class="ma-2 white--text"
                    @click.stop="update"
                    :loading="btnLoading"
                    :disabled="!form_valid || btnLoading"
                  >
                    Update
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
import { mapGetters } from "vuex";
import { userMixin } from "@/mixins/user.js";
import BaseTitle from "@/components/base/BaseTitle.vue";
export default {
  name: "userView",
  components: { BaseTitle },
  mixins: [userMixin],
  data: () => ({
    show: false,
    showConfirm: false,
    role_list: [],
    headers: [
      { text: "Username", value: "username" },
      { text: "Name", value: "name" },
      { text: "E-Mail", value: "email" },
      { text: "Phone Number", value: "phone" },
      { text: "Role", value: "roles" },
      { text: "Status", value: "is_active" },
      { text: "AKSI", value: "actions", sortable: false, width: 100 },
    ],

    form_data: {
      id: "",
      username: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      is_active: true,
      role: "",
    },
    form_default: {
      username: "",
      name: "",
      phone: "",
      password: "",
      password_confirmation: "",
      is_active: true,
      role: "",
    },
    rule_username: [(value) => !!value || "Username please fill in !!!"],
    rule_name: [(value) => !!value || "Name please fill in !!!"],
    rule_email: [(value) => !!value || "Name please fill in !!!"],
    rule_description: [(value) => !!value || "user description please fill in"],
  }),

  methods: {
    initialize: async function () {
      this.datatableLoading = true;
      await this.$axios
        .get("/user", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.datatable = data.users;
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
              "/user/" + this.form_data.id,
              {
                _method: "PUT",
                username: this.form_data.username,
                name: this.form_data.name,
                phone: this.form_data.phone,
                password: this.form_data.password,
                email: this.form_data.email,
                is_active: this.form_data.is_active,
                role: this.form_data.role.name,
              },
              {
                headers: {
                  Authorization: this.$store.getters["auth/Token"],
                },
              }
            )
            .then(({ data }) => {
              Object.assign(this.datatable[this.editedIndex], data.users);
              this.closedialogForm();
              this.btnLoading = false;
            })
            .catch(() => {
              this.btnLoading = false;
            });
        } else {
          await this.$axios
            .post(
              "/user",
              {
                username: this.form_data.username,
                name: this.form_data.name,
                phone: this.form_data.phone,
                password: this.form_data.password,
                email: this.form_data.email,
                is_active: this.form_data.is_active,
                role: this.form_data.role.name,
              },
              {
                headers: {
                  Authorization: this.$store.getters["auth/Token"],
                },
              }
            )
            .then(({ data }) => {
              this.datatable.push(data.users);
              this.closedialogForm();
              this.btnLoading = false;
            })
            .catch(() => {
              this.btnLoading = false;
            });
        }
      }
    },
    update() {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        this.$axios
          .post(
            "/user/" + this.form_data.id,
            {
              _method: "PUT",
              username: this.form_data.username,
              name: this.form_data.name,
              phone: this.form_data.phone,
              email: this.form_data.email,
              is_active: this.form_data.is_active,
            },
            {
              headers: {
                Authorization: this.$store.getters["auth/Token"],
              },
            }
          )
          .then(({ data }) => {
            Object.assign(this.datatable[this.editedIndex], data.users);
            this.closedialogForm();
            this.btnLoading = false;
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },
    addUser: async function () {
      await this.$axios
        .get("/role", { headers: { Authorization: this.TOKEN } })
        .then(({ data }) => {
          this.role_list = data.roles;
        });
      this.dialogfrm = true;
    },

    resetPassword() {},
  },
  computed: {
    ...mapGetters("auth", {
      ACCESS_TOKEN: "AccessToken",
      TOKEN: "Token",
    }),
  },
};
</script>