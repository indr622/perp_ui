<template>
  <div>
    <base-title
      title="Create Product"
      subtitle="Please fill in the Product information in the form below"
    />
    <!-- Form -->
    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <form-product />

      <v-row class="mx-1">
        <back-button />
        <v-btn
          color="primary"
          small
          class="ma-2"
          @click.stop="store"
          :loading="btnLoading"
          :disabled="!form_valid || btnLoading"
          >Save <v-icon right>mdi-content-save</v-icon></v-btn
        >
      </v-row>
    </v-form>
  </div>
</template>

<script>
import BackButton from "@/components/base/BackButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import FormProduct from "./Form.vue";
import { mapState } from "vuex";
export default {
  name: "ProductCreate",

  data() {
    return {
      btnLoading: false,
      form_valid: true,
    };
  },

  methods: {
    store: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        await this.$axios
          .post("/product", this.FORM, {
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
  computed: {
    ...mapState("product", {
      FORM: (state) => state.form,
    }),
  },

  components: {
    BaseTitle,
    BackButton,
    "form-product": FormProduct,
  },
};
</script>