<template>
  <v-text-field
    :value="value"
    outlined
    dense
    @input="(v) => $emit('input', v)"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
<script>
export default {
  inheritAttrs: false,
  props: ["value"],
};
</script>
