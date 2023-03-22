<template>
  <div>
    <base-title title="Create Material" subtitle="Please fill in the Material information in the form below" />

    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <form-item />
      <v-row class="mx-2">
        <back-button />
        <v-btn color="primary" small class="ma-2" @click.stop="save" :loading="btnLoading"
          :disabled="!form_valid || btnLoading">Save <v-icon right>mdi-content-save</v-icon></v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import BackButton from "@/components/base/BackButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import FormItem from "@/views/master/item/Form.vue";
import { mapState } from "vuex";
export default {
  name: "ItemCreate",
  data() {
    return {
      btnLoading: false,
      form_valid: true,
    };
  },

  methods: {
    save: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        await this.$axios
          .post("/item", this.FORM, {
            headers: {
              Authorization: this.$store.getters["auth/Token"],
            },
          })
          .then(() => {
            this.btnLoading = false;
            this.$router.push({ name: "item.index" });
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },
  },

  computed: {
    ...mapState("item", {
      FORM: (state) => state.form,
    }),
  },

  destroyed() {
    this.$store.commit("item/CLEAR_FORM");
  },
  components: {
    BaseTitle,
    BackButton,
    "form-item": FormItem,
  },
};
</script>