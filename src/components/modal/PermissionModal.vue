<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Role And Permissions</span>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-container fluid>
          <h2 class="mb-2">Role Name : {{ role.name }}</h2>
          <v-row no-gutters>
            <v-col
              class="my-2"
              xs="12"
              sm="6"
              md="4"
              lg="3"
              v-for="(permissions, index) in daftar_permissions"
              :key="permissions.id"
            >
              <v-card class="mx-1">
                <v-card-title>{{ index }}</v-card-title>
                <v-checkbox
                  class="ml-2 mb-2"
                  v-model="permissions_selected"
                  v-for="list in permissions"
                  :key="list.id"
                  :label="list.name"
                  hide-details
                ></v-checkbox>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="close" outlined
          >Close <v-icon>mdi-close </v-icon></v-btn
        >
        <v-btn color="primary" :loading="btnLoading" @click.stop="save">
          Save Changes
          <v-icon>mdi-content-save </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { datatableMixin } from "@/mixins/datatable.js";
export default {
  name: "PermissionModal",
  mixins: [datatableMixin],
  data: () => ({
    headers: [
      { text: "Permission Name", value: "name" },
      { text: "GUARD", value: "guard_name" },
      { text: "AKSI", value: "actions", sortable: false, width: 100 },
    ],
    search: "",
    perm_selected: [],
  }),
  methods: {
    save() {
      this.btnLoading = true;
      this.$ajax
        .post(
          "/system/setting/roles/storerolepermissions",
          {
            role_id: this.role.id,
            chkpermission: this.permissions_selected,
          },
          {
            headers: {
              Authorization: this.TOKEN,
            },
          }
        )
        .then(() => {
          this.btnLoading = false;
          this.close();
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },
    revoke(item) {
      this.btnLoading = true;
      this.$ajax
        .post(
          "/system/setting/roles/revokerolepermissions",
          {
            role_id: this.role.id,
            name: item.name,
          },
          {
            headers: {
              Authorization: this.TOKEN,
            },
          }
        )
        .then(() => {
          this.btnLoading = false;
          this.close();
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },
    close() {
      this.btnLoading = false;
      this.permissions_selected = [];
      this.$emit("closeRolePermissions", this.role.id);
    },
  },
  props: {
    role: Object,
    permissionslist: Array,
    permissionsselected: Array,
  },
  computed: {
    ...mapGetters("auth", {
      TOKEN: "Token",
    }),
    daftar_permissions() {
      return this.permissionslist;
    },
    permissions_selected: {
      get() {
        if (this.perm_selected.length > 0) {
          return this.perm_selected;
        } else {
          return this.permissionsselected;
        }
      },
      set(val) {
        this.perm_selected = val;
      },
    },
  },
};
</script>