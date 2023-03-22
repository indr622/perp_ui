<template>
  <div>
    <base-title
      title="Edit Warehouse"
      subtitle="Please fill in the Warehouse information in the form below"
    />
    <!-- Form -->
    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field
            label="Warehouse Name"
            v-model="form_data.name"
            :rules="rule_name"
            outlined
            dense
          ></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field
            label="Warehouse Email"
            v-model="form_data.email"
            outlined
            dense
            :rules="rule_email"
          ></v-text-field>
        </base-column>
      </v-row>
      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field
            label="Warehouse Phone"
            v-model="form_data.phone"
            outlined
            dense
            :rules="rule_email"
          ></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-switch dense v-model="form_data.is_active" label="USE">
          </v-switch> </base-column
      ></v-row>

      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-textarea
            :rules="rule_address"
            label="Address"
            rows="3"
            v-model="form_data.address"
            outlined
            dense
          ></v-textarea>
        </base-column>
      </v-row>

      <v-row class="mx-1"> </v-row>

      <v-row class="mx-1">
        <back-button />
        <v-btn
          color="primary"
          small
          class="ma-2"
          @click.stop="update"
          :loading="btnLoading"
          :disabled="!form_valid || btnLoading"
          >Update <v-icon right>mdi-content-save</v-icon></v-btn
        >
      </v-row>
    </v-form>
  </div>
</template>

<script>
import BackButton from "@/components/base/BackButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
export default {
  components: { BaseTitle, BaseColumn, BackButton },
  name: "WarehouseEdit",
  data() {
    return {
      btnLoading: false,
      form_valid: true,
      form_data: {
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        is_active: true,
      },
      rule_name: [(v) => !!v || "Warehouse name please fill in !!!"],
      rule_email: [(v) => !!v || "Warehouse Email address please fill in !!!"],
      rule_phone: [
        (v) => !!v || "Phone number please fill in !!!",
        (v) => /^[0-9]+$/.test(v) || "Phone number can only be numbers",
      ],
      rule_address: [(v) => !!v || "Address please fill in !!!"],
    };
  },

  created() {
    this.getWarehouse();
  },

  methods: {
    getWarehouse: async function () {
      await this.$axios
        .get("/warehouse/" + this.$route.params.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.form_data.name = data.warehouse.name;
          this.form_data.email = data.warehouse.email;
          this.form_data.phone = data.warehouse.phone;
          this.form_data.address = data.warehouse.address;
          this.form_data.is_active = data.warehouse.is_active;
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },
    update: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        await this.$axios
          .put("/warehouse/" + this.$route.params.id, this.form_data, {
            headers: {
              Authorization: this.$store.getters["auth/Token"],
            },
          })
          .then(() => {
            this.btnLoading = false;
            this.$router.push({ name: "warehouse.index" });
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },
  },
};
</script>