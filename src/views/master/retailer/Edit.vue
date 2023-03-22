<template>
  <div>
    <base-title
      title="Edit Retailer"
      subtitle="Please fill in the Retailer information in the form below"
    />
    <!-- Form -->
    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field
            label="Retailer Name"
            v-model="form_data.name"
            :rules="rule_name"
            outlined
            dense
          ></v-text-field>
        </base-column>

        <base-column :lg="4" :md="6" :sm="12">
          <v-switch dense v-model="form_data.is_active" label="USE"> </v-switch>
        </base-column>
      </v-row>

      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field
            label="Retailer Email"
            v-model="form_data.email"
            outlined
            dense
          ></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field
            label="Retailer Phone"
            v-model="form_data.phone"
            outlined
            dense
          ></v-text-field>
        </base-column>
      </v-row>

      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-textarea
            label="Address"
            rows="3"
            v-model="form_data.address"
            outlined
            dense
          ></v-textarea>
        </base-column>
      </v-row>

      <v-row>
        <v-container>
          <back-button />
          <v-btn
            color="primary"
            small
            class="ma-1"
            @click.stop="update"
            :loading="btnLoading"
            :disabled="!form_valid || btnLoading"
            >Update <v-icon right>mdi-content-save</v-icon></v-btn
          >
        </v-container>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import BackButton from "@/components/base/BackButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters } from "vuex";
export default {
  components: { BaseTitle, BaseColumn, BackButton },
  name: "CustomersEdit",
  data() {
    return {
      btnLoading: false,
      form_valid: true,
      form_data: {
        name: "",
        email: "",
        phone: "",
        address: "",
        is_active: true,
      },
    };
  },

  created() {
    this.findOne();
  },

  methods: {
    update: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        await this.$axios
          .put(
            "/retailer/" + this.$route.params.id,
            {
              name: this.form_data.name,
              email: this.form_data.email,
              phone: this.form_data.phone,
              address: this.form_data.address,
              is_active: this.form_data.is_active,
            },
            {
              headers: {
                Authorization: this.TOKEN,
              },
            }
          )
          .then(() => {
            this.btnLoading = false;
            this.$router.push({ name: "retailer.index" });
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },

    findOne() {
      this.$axios
        .get("/retailer/" + this.$route.params.id, {
          headers: {
            Authorization: this.TOKEN,
          },
        })
        .then(({ data }) => {
          this.form_data.name = data.retailers.name;
          this.form_data.email = data.retailers.email;
          this.form_data.phone = data.retailers.phone;
          this.form_data.address = data.retailers.address;
          this.form_data.is_active = data.retailers.is_active;
        })
        .catch(() => {
          this.$router.push({ name: "retailer.index" });
        });
    },
  },

  computed: {
    ...mapGetters("auth", {
      TOKEN: "Token",
    }),
  },
};
</script>