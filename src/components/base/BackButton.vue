<template>
  <v-btn
    small
    class="ma-2"
    color="darkblue"
    outlined
    @click="$router.go(-1)"
    title="Back"
  >
    <v-icon left>mdi-arrow-left </v-icon>
    Back</v-btn
  >
</template>
<script>
export default {
  name: "BackButton",
  props: {
    label: {
      type: String,
      default: "Back",
    },
  },
};
</script>