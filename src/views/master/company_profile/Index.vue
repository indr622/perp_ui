<template>
  <div>
    <base-title title="Company Profile"
      subtitle="Basic information of company that will be displayed on all document" />

    <v-spacer></v-spacer>
    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <v-col xs="12" sm="12" md="12" lg="12">
          <img src="@/assets/no_image.png" width="150" class="rounded-lg" alt="" />
        </v-col>
      </v-row>
      <base-sub-title title="Company Information" />

      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <v-col xs="12" sm="12" md="6" lg="4">
          <v-text-field v-model="form_data.name" label="Company Name" outlined dense hide-details></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="4">
          <v-text-field v-model="form_data.owner" label="Owner Name" outlined dense hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <v-col xs="12" sm="12" md="6" lg="4">
          <v-text-field v-model="form_data.email" label="Company Email" outlined dense hide-details></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="4">
          <v-text-field v-model="form_data.phone" label="Company Phone" outlined dense hide-details></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <v-col xs="12" sm="12" md="6" lg="4">
          <v-textarea v-model="form_data.address" label="Company Address" outlined dense hide-details></v-textarea>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="4">
          <v-text-field v-model="form_data.city" label="Company City" outlined dense hide-details></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="4">
          <v-text-field v-model="form_data.state" label="Province" outlined dense hide-details></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="6">
          <v-textarea v-model="form_data.term_and_condition" label="Term And Condition" outlined dense
            hide-details></v-textarea>
        </v-col>
      </v-row>

      <v-row class="mx-1">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <v-col xs="12" sm="12" md="6" lg="4">
          <v-btn color="primary" class="ma-2 white--text" @click.stop="update" :loading="btnLoading"
            :disabled="!form_valid || btnLoading">
            <v-icon>mdi-content-save </v-icon>
            Save Changes
          </v-btn>
        </v-col></v-row>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseSubTitle from "@/components/base/BaseSubTitle.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";

export default {
  components: { BaseTitle, BaseSubTitle },
  name: "CompanyProfileIndex",
  data() {
    return {
      form_valid: true,
      btnLoading: false,
      form_data: {},
    };
  },

  created() {
    this.getCompanyProfile();
  },

  methods: {
    getCompanyProfile() {
      this.$axios
        .get("/company-profile/1", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.form_data = data.company;
        })
        .catch(() => {
          alert("Error");
        });
    },

    update: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        await this.$axios
          .post(
            "/company-profile/" + this.form_data.id,
            {
              _method: "PUT",
              name: this.form_data.name,
              owner: this.form_data.owner,
              email: this.form_data.email,
              phone: this.form_data.phone,
              address: this.form_data.address,
              city: this.form_data.city,
              province: this.form_data.province,
              term_and_condition: this.form_data.term_and_condition,
            },
            {
              headers: {
                Authorization: this.$store.getters["auth/Token"],
              },
            }
          )
          .then(() => {
            this.btnLoading = false;
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },
  },
  computed: {
    ...mapGetters("auth", {
      ACCESS_TOKEN: "AccessToken",
      TOKEN: "Token",
    }),
  },
};
</script>
