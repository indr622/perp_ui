<template>
  <v-banner class="mt-2 summary" outlined rounded single-line>
    <v-row no-gutters>
      <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
        <v-avatar :color="colorSecondary" size="40">
          <v-icon :color="colorPrimary">{{ icon }}</v-icon>
        </v-avatar>
      </v-col>
      <v-col cols="9" xs="9" sm="9" md="9">
        <h5 :class="colorPrimary + '--text ml-2'">{{ status }}</h5>
        <h5 class="ml-2">{{ desc }}</h5>
        <h5 :class="colorPrimary + '--text  ml-2 '">{{ money }}</h5>
      </v-col>
    </v-row>
  </v-banner>
</template>

<script>
export default {
  name: "CardSummary",
  props: {
    title: {
      type: String,
      default: "Title",
    },
    desc: {
      type: Number,
      default: 0,
    },
    money: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "0",
    },
    icon: {
      type: String,
      default: "",
    },
    colorPrimary: {
      type: String,
      default: "",
    },
    colorSecondary: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.summary {
  border-radius: 10px;
}
</style>