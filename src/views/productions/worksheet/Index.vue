<template>
  <main-layout>
    <base-header>
      <template v-slot:icon>mdi-file-excel-box</template>
      <template v-slot:name> Worksheet </template>
      <template v-slot:breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
    </base-header>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
export default {
  name: "worksheetView",

  created() {
    this.breadcrumbs = [
      { text: "Dashboard", disabled: false, to: "/dashboard" },
      { text: "Worksheet", disabled: true },
    ];
  },
  components: {
    MainLayout,
    BaseHeader,
  },
};
</script>