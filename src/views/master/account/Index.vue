<template>
  <div>
    <base-title
      title="Account Setting"
      subtitle="You can update information using form bellow"
    />

    <v-spacer></v-spacer>
    <v-form v-model="form_valid" lazy-validation ref="form_data">
      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <v-col xs="12" sm="12" md="12" lg="12">
          <img src="@/assets/user_default.png" width="135" alt="" />
        </v-col>

        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <base-column :sm="12" :md="6" :lg="3">
          <v-text-field
            label="Username"
            v-model="form_data.username"
            outlined
            dense
            :rules="rule_username"
          ></v-text-field>
        </base-column>
        <base-column :sm="12" :md="6" :lg="3">
          <v-text-field
            label="Name"
            v-model="form_data.name"
            outlined
            dense
            :rules="rule_name"
          ></v-text-field>
        </base-column>
      </v-row>
      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <base-column :sm="12" :md="6" :lg="3">
          <v-text-field
            label="Phone Number"
            v-model="form_data.phone"
            outlined
            dense
            :rules="rule_phone"
          ></v-text-field>
        </base-column>
        <base-column :sm="12" :md="6" :lg="3">
          <v-text-field
            disabled
            label="Role"
            v-model="form_data.role"
            outlined
            dense
          ></v-text-field>
        </base-column>
      </v-row>
      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <base-column :sm="12" :md="6" :lg="3">
          <v-text-field
            label="Address"
            v-model="form_data.address"
            outlined
            dense
            :rules="rule_address"
          ></v-text-field>
        </base-column>
        <base-column :sm="12" :md="6" :lg="3">
          <v-text-field
            label="City"
            v-model="form_data.city"
            outlined
            dense
            :rules="rule_city"
          ></v-text-field>
        </base-column>
      </v-row>

      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <base-column :sm="12" :md="6" :lg="3">
          <v-text-field
            label="Province"
            v-model="form_data.state"
            outlined
            dense
            hide-details
            :rules="rule_state"
          ></v-text-field>
        </base-column>
        <base-column :sm="12" :md="6" :lg="3">
          <v-text-field
            label="ZIP Code"
            v-model="form_data.zip"
            outlined
            dense
            hide-details
            :rules="rule_zip"
          ></v-text-field>
        </base-column>
      </v-row>
    </v-form>

    <v-row class="mx-1 mt-2">
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="12" md="6" lg="3">
        <v-btn
          color="primary"
          small
          class="ma-2 white--text"
          @click.stop="update"
          :loading="btnLoading"
          :disabled="!form_valid || btnLoading"
        >
          <v-icon>mdi-content-save</v-icon>
          Save
        </v-btn>
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="3">
        <v-dialog v-model="password_dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="float-end"
              color="primary"
              outlined
              rounded
              @click="loader = 'loading3'"
            >
              <v-icon>mdi-key-variant</v-icon>
              Change Password
            </v-btn>
          </template>
          <v-form ref="form_password" v-model="form_valid" lazy-validation>
            <v-card class="rounded-lg">
              <v-card-title class="mb-3">
                <span class="headline">Change Password</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="current_password"
                  label="Current Password"
                  outlined
                  dense
                  :append-icon="show_current ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_current ? 'text' : 'password'"
                  @click:append="show_current = !show_current"
                  :rules="rule_old"
                >
                </v-text-field>
                <v-text-field
                  v-model="new_password"
                  label="New Password"
                  outlined
                  dense
                  :append-icon="show_new ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_new ? 'text' : 'password'"
                  @click:append="show_new = !show_new"
                  :rules="rule_new"
                >
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined @click.stop="closedialogForm"
                  >Close
                  <v-icon right dark>mdi-close</v-icon>
                </v-btn>
                <v-btn
                  color="primary"
                  class="ma-2 white--text"
                  @click.stop="updatePassword"
                  :loading="btnLoading"
                  :disabled="!form_valid || btnLoading"
                >
                  <v-icon>mdi-content-save</v-icon>
                  Save Changes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { accountSetting } from "@/mixins/account.js";
import BaseColumn from "@/components/base/BaseColumn.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";

export default {
  components: { BaseColumn, BaseTitle },
  name: "AccountSetting",
  created() {
    this.form_data = this.$store.getters["auth/User"];
  },

  mixins: [accountSetting],

  methods: {
    closedialogForm() {
      this.password_dialog = false;
      setTimeout(() => {
        this.current_password = "";
        this.new_password = "";
      }, 300);
    },

    updatePassword() {
      if (this.$refs.form_password.validate()) {
        this.btnLoading = true;
        this.$axios
          .post(
            "/auth/update-password/" +
              this.$store.getters["auth/AttributeUser"]("id"),
            {
              _method: "PUT",
              old_password: this.current_password,
              new_password: this.new_password,
            },
            {
              headers: {
                Authorization: this.$store.getters["auth/Token"],
              },
            }
          )
          .then(() => {
            this.$refs.form_password.reset();
            this.current_password = "";
            this.new_password = "";
            this.btnLoading = false;
            this.password_dialog = false;
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },

    update: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        await this.$axios
          .post(
            "/auth/update/" + this.$store.getters["auth/AttributeUser"]("id"),
            {
              _method: "PUT",
              username: this.form_data.username,
              name: this.form_data.name,
              phone: this.form_data.phone,
              address: this.form_data.address,
              city: this.form_data.city,
              state: this.form_data.state,
              zip: this.form_data.zip,
            },
            {
              headers: {
                Authorization: this.$store.getters["auth/Token"],
              },
            }
          )
          .then(() => {
            this.btnLoading = false;
            this.$router.push("/dashboard");
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },
  },
};
</script>
