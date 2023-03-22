<template>
  <v-col :md="md" :lg="lg" :sm="sm" class="py-0" :offset="offset">
    <slot></slot>
  </v-col>
</template>

<script>
export default {
  name: "BaseColumn",
  props: {
    md: {
      type: Number,
      default: 0,
    },
    lg: {
      type: Number,
      default: 0,
    },
    sm: {
      type: Number,
      default: 0,
    },
    offset: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>