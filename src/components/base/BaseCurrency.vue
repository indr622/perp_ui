<template>
  <div>
    {{ nilai }}
  </div>
</template>

<script>
export default {
  name: "BaseCurrency",
  props: {
    nilai: {
      type: Number,
      default: 0,
    },
  },
};
