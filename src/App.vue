<template>
  <v-app style="background-color: #f7f9fc">
    <router-view />

    <v-snackbar v-model="snackbar_success" :color="snackbar_color" :top="true" outlined right>
      <template v-slot:action="{ attrs }">
        <v-btn small color="white" text v-bind="attrs" @click="snackbar_success = false">
          Close
        </v-btn>
      </template>
      <v-icon color="primary">mdi-checkbox-marked-circle </v-icon>
      {{ page_message }}<br />
    </v-snackbar>
    <v-snackbar v-model="snackbar_error" :color="snackbar_color" :top="true">
      {{ page_message }}<br />
      <div v-for="err in page_form_error_message" :key="err.name">
        <strong>{{ err.field }}</strong>
        <div v-for="error in err.error" :key="error.message">
          {{ error.message }}
        </div>
      </div>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "perp",
  created() {
    this.$axios.interceptors.request.use(
      (config) => {
        this.setLoading(true);
        return config;
      },
      (error) => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
    this.$axios.interceptors.response.use(
      (response) => {
        let data = response.data;
        switch (data.pid) {
          case "store":
          case "update":
          case "destroy":
          case "resendemail":
            this.snackbar_color = "primary";
            this.snackbar_success = true;
            this.page_message = data.message;
            break;
        }
        this.setLoading(false);
        return response;
      },
      (error) => {
        const {
          config,
          response: { data, status },
        } = error;
        switch (status) {
          case 401:
            if (data.page != "login") {
              this.$store.dispatch("auth/logout");
              this.$store.dispatch("global/reinit");
              this.snackbar_color = "error";
              this.snackbar_error = true;
              this.page_message =
                "(" + status + ") Session has expired please login again";
            }
            break;
          case 400:
            this.snackbar_error = true;
            this.snackbar_color = "error";
            this.page_message = data.message;
            break;
          case 403:
            this.snackbar_error = true;
            this.snackbar_color = "error";
            this.page_message =
              "(" +
              status +
              ": Forbidden) " +
              data.message +
              " to access resource [" +
              config.baseURL +
              config.url +
              "]";
            break;
          case 404:
            this.snackbar_error = true;
            this.snackbar_color = "error";
            this.page_message =
              "(" +
              status +
              ": " +
              data.error +
              ") Please check the route url (" +
              config.baseURL +
              config.url +
              ") is it available ?";
            break;
          case 405:
            this.snackbar_error = true;
            this.snackbar_color = "error";
            this.page_message =
              "(" +
              status +
              ": " +
              data.exception +
              ") Please check HTTP METHOD ";
            break;
          case 422:
            this.snackbar_color = "error";
            this.snackbar_error = true;
            var error_messages = [];
            for (var p in data) {
              var messages = [];
              var error_list = data[p];
              if (Array.isArray(error_list)) {
                for (var i = 0; i < error_list.length; i++) {
                  messages.push({
                    message: error_list[i],
                  });
                }
                error_messages.push({
                  field: p,
                  error: messages,
                });
              } else {
                error_messages.push({
                  field: p,
                  error: [
                    {
                      message: data[p],
                    },
                  ],
                });
              }
            }
            this.page_form_error_message = error_messages;
            this.page_message = "(" + status + ": Unprocessible Entity) ";
            break;
          case 500:
            this.snackbar_error = true;
            this.snackbar_color = "error";
            this.page_message =
              "(" + status + " (internal server eror): " + data.message;
            break;
        }
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
  },

  data() {
    return {
      // axiosCallloading
      refCount: 0,
      isLoading: false,
      snackbar_success: false,
      snackbar_error: false,
      snackbar_color: "error",
      page_message: "",
      page_form_error_message: {},
    };
  },
  methods: {
    setLoading(isLoading) {
      if (isLoading) {
        this.refCount++;
        this.isLoading = true;
      } else if (this.refCount > 0) {
        this.refCount--;
        this.isLoading = this.refCount > 0;
      }
    },
  },
};
</script>
