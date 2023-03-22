<template>
  <div>
    <base-title title="Set Permissions" subtitle="You can add permissions based on Role" />
    <v-spacer></v-spacer>

    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <v-row class="mx-2 mt-2">
        <base-column :lg="4" :md="4" :sm="12">
          <v-text-field dense readonly label="Role Name" outlined v-model="role.name"></v-text-field>
        </base-column>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mx-2 mt-2">
        <base-column class="my-2" :lg="3" :md="3" :sm="6">
          <template v-for="(row, index) in permissions">
            <input type="checkbox" class="minimal-red" :key="index" :value="row.name" :checked="
              role_permission.findIndex((x) => x.name == row.name) != -1
            " @click="addPermission(row.name)" />
            {{ row.name }} <br :key="'row' + index" />
            <br :key="'enter' + index" v-if="(index + 1) % 4 == 0" />
          </template>
        </base-column>
      </v-row>
      <v-row class="mx-2">
        <back-button />
        <v-btn color="primary" small class="ma-2" @click.stop="submit" :loading="btnLoading"
          :disabled="!form_valid || btnLoading">Save <v-icon right>mdi-content-save</v-icon></v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import BackButton from "@/components/base/BackButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
export default {
  name: "PermissionSet",
  data() {
    return {
      btnLoading: false,
      form_valid: true,
      role: [],
      permissions: [],
      role_permission: [],
      new_permission: [],
    };
  },

  created() {
    this.getRole();
    this.getPermission();
    this.getRolePermission();
  },

  methods: {
    getRole: async function () {
      await this.$axios
        .get("/role/" + this.$route.params.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.role = data.roles;
        })
        .catch(() => {
          this.$router.push({ name: "role.index" });
        });
    },

    getPermission: async function () {
      await this.$axios
        .get("/permissions", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.permissions = data.permissions;
        })
        .catch(() => {
          this.$router.push({ name: "role.index" });
        });
    },

    getRolePermission: async function () {
      await this.$axios
        .get(
          "/role/" + this.$route.params.id + "/permissions",

          {
            headers: {
              Authorization: this.$store.getters["auth/Token"],
            },
          }
        )
        .then(({ data }) => {
          this.role_permission = data.roles;
        })
        .catch(() => {
          this.$router.push({ name: "role.index" });
        });
    },
    addPermission(name) {
      let index = this.new_permission.findIndex((x) => x == name);
      if (index == -1) {
        this.new_permission.push(name);
      } else {
        this.new_permission.splice(index, 1);
      }
    },

    submit: async function () {
      this.btnLoading = true;
      await this.$axios
        .post(
          "/set-role-permissions",
          {
            role_id: this.role.id,
            permissions: this.new_permission,
          },
          {
            headers: {
              Authorization: this.$store.getters["auth/Token"],
            },
          }
        )
        .then(() => {
          this.btnLoading = false;
          this.$router.push({ name: "role.index" });
        })
        .catch(() => {
          this.btnLoading = false;
          this.$router.push({ name: "role.index" });
        });
    },
  },

  computed: {},

  components: {
    BaseTitle,
    BackButton,
    BaseColumn,
  },
};
</script>