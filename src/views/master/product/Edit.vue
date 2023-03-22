<template>
  <div>
    <base-title title="Edit Product" subtitle="Please fill in the Product information in the form below" />
    <!-- Form -->
    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <form-product />

      <v-row class="mx-1">
        <back-button />
        <v-btn color="primary" small class="ma-2" @click.stop="update" :loading="btnLoading"
          :disabled="!form_valid || btnLoading">Update <v-icon right>mdi-content-save</v-icon></v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import BackButton from "@/components/base/BackButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import FormProduct from "./Form.vue";
import { mapState } from 'vuex';
export default {
  name: "ProductCreate",
  created() {
    this.find();
  },
  data() {
    return {
      btnLoading: false,
      form_valid: true,
    };
  },

  methods: {
    find: async function () {
      await this.$axios
        .get("/product/" + this.$route.params.id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.$store.commit("product/SET_FORM", data.products);
          this.loading = false;
          this.disabled = false;
        });
    },
    update: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        await this.$axios
          .put("/product/" + this.$route.params.id, this.Form, {
            headers: {
              Authorization: this.$store.getters["auth/Token"],
            },
          })
          .then(() => {
            this.btnLoading = false;
            this.$router.push({ name: "product.index" });
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },
  },
  destroyed() {
    this.$store.commit("product/CLEAR_FORM");
  },

  computed: {
    ...mapState("product", {
      Form: (state) => state.form,
    }),
  },

  components: { BaseTitle, BackButton, "form-product": FormProduct },
};
</script>