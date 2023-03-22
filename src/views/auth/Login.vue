<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64" color="primary" />
    </v-overlay>
    <v-card class="auth-card pa-8 pt-7" max-width="550">
      <v-card-title class="justify-center">
        <v-img src="@/assets/gmk_logo.svg" contain max-width="60%" max-height="60%" class="mx-auto"
          lazy-src="@/assets/gmk_logo.svg"></v-img>
      </v-card-title>
      <v-card-text class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Please login with your credential 👋🏻
        </h5>
      </v-card-text>

      <v-form ref="form_login" @keyup.native.enter="loginAction" lazy-validation>
        <v-card-text>
          <base-input v-model="form_login.username" label="Username" :rules="rule_username" />

          <v-spacer></v-spacer>
          <base-input v-model="form_login.password" label="Password" type="password" :rules="rule_password" />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn height="40px" color="#1A237E" class="white--text" @click="loginAction" :loading="btnLoading"
            :disabled="btnLoading" block>
            LOGIN
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-alert border="right" type="error" :value="form_error" icon="mdi-close-octagon-outline">Invalid
            credentials</v-alert>
        </v-card-text>
      </v-form>
    </v-card>

    <v-img class="auth-footer-mask d-none d-md-block" src="@/assets/auth/mask-light.png"
      lazy-src="@/assets/auth/mask-light.png"></v-img>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput.vue";
export default {
  name: "Login",

  data: () => ({
    isLoading: false,
    btnLoading: false,
    form_valid: true,
    form_error: false,
    form_login: {
      username: "",
      password: "",
    },
    rule_username: [
      (value) => !!value || "Please fill in the Username field !!!",
    ],
    rule_password: [
      (value) => !!value || "Please fill in the Password field !!!",
    ],
  }),

  created() {
    if (this.$store.getters["auth/Authenticated"]) {
      this.$router.push("/dashboard");
    }
  },

  methods: {
    loginAction: async function () {
      if (this.$refs.form_login.validate()) {
        this.isLoading = true;
        this.btnLoading = true;
        await this.$axios
          .post("/auth/login", {
            username: this.form_login.username,
            password: this.form_login.password,
          })
          .then(({ data }) => {
            this.$axios
              .get("/auth/me", {
                headers: {
                  Authorization: data.token_type + " " + data.access_token,
                },
              })
              .then((response) => {
                var data_user = {
                  token: data,
                  user: response.data,
                };
                this.$store.dispatch("auth/afterLoginSuccess", data_user);
                this.btnLoading = false;
                this.form_error = false;
                this.isLoading = false;
                this.$axios
                  .get("dashboard/summary", {
                    headers: {
                      Authorization: data.token_type + " " + data.access_token,
                    },
                  })
                  .then((response) => {
                    this.$store.commit("dashboard/SET_SUMMARY", response.data);
                  });
                this.$router.push("/dashboard");
              });
          })
          .catch(() => {
            this.form_error = true;
            this.btnLoading = false;
          });
      }
    },
  },
  components: {
    BaseInput,
  },
};
</script>

<style scoped>
.auth-wrapper {
  min-block-size: calc(var(--vh, 1vh) * 100);
}

.auth-footer-mask {
  position: absolute;
  inset-block-end: 0;
  min-inline-size: 100%;
}

.auth-card {
  z-index: 1 !important;
}

.auth-footer-start-tree,
.auth-footer-end-tree {
  position: absolute;
  z-index: 1;
}

.auth-footer-start-tree {
  inset-block-end: 0;
  inset-inline-start: 0;
}

.auth-footer-end-tree {
  inset-block-end: 0;
  inset-inline-end: 0;
}

.auth-illustration {
  z-index: 1;
}

.auth-logo {
  position: absolute;
  z-index: 1;
  inset-block-start: 2rem;
  inset-inline-start: 2.3rem;
}

.auth-bg {
  background-color: rgb(var(--v-theme-surface));
}
</style>