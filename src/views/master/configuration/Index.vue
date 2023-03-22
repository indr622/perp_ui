<template>
  <div>
    <base-title title="Configuration System" subtitle="You can generate key" />
    <!-- Form -->
    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <v-row class="mx-1 mt-4">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />

        <base-column :sm="12" :md="6" :lg="9">
          <v-text-field
            label="Accounting API Key"
            readonly
            v-model="key.data.key"
            outlined
            dense
          ></v-text-field>
        </base-column>
        <base-column :sm="12" :md="6" :lg="3">
          <v-btn color="primary" @click.stop="generate" :disabled="key.data.key"
            >Generate Api Key <v-icon right>mdi-content-save</v-icon></v-btn
          >
        </base-column>
      </v-row>
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
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters } from "vuex";
export default {
  components: { BaseTitle, BackButton, BaseColumn },
  name: "GenerateKey",
  data() {
    return {
      btnLoading: false,
      form_valid: true,
      key: [],
    };
  },

  created() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .get("/system/configuration/accounting-key", {
          headers: {
            Authorization: this.TOKEN,
          },
        })
        .then((res) => {
          this.key = res;
          this.btnLoading = false;
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },

    generate() {
      this.$axios
        .get("/system/configuration/generate", {
          headers: {
            Authorization: this.TOKEN,
          },
        })
        .then(() => {
          this.btnLoading = false;
        })
        .catch(() => {
          this.btnLoading = false;
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