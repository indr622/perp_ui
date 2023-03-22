<template>
  <main-layout>
    <base-header>
      <template v-slot:icon> mdi-folder </template>
      <template v-slot:name> Master Management</template>
      <template v-slot:subtitle> Master Management</template>
    </base-header>
    <v-row class="mr-1">
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="12" md="3" lg="2">
        <v-list dense rounded class="d-sm-none d-md-flex">
          <v-list-item-group v-model="model" mandatory color="indigo">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.href">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-col xs="12" sm="12" md="9" lg="10">
        <v-card elevation="5" class="rounded-lg">
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
  </main-layout>
</template>
<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
export default {
  name: "MasterIndex",
  data: () => ({
    items: [
      {
        icon: "mdi-account-circle",
        text: "Account Settings",
        href: "/master/account-settings",
      },
      {
        icon: "mdi-domain",
        text: "Company Profile",
        href: "/master/company-profile",
      },
      // {
      //   icon: "mdi-cog",
      //   text: "Configuration System",
      //   href: "/master/configuration-system",
      // },
      {
        icon: "mdi-handshake-outline",
        text: "Customers",
        href: "/master/customers",
      },
      { icon: "mdi-handshake", text: "Retailers", href: "/master/retailers" },
      { icon: "mdi-handshake", text: "Suppliers", href: "/master/suppliers" },
      { icon: "mdi-account-group", text: "Users", href: "/master/users" },

      {
        icon: "mdi-shield-account",
        text: "Role Permissions",
        href: "/master/role",
      },
      {
        icon: "mdi-square-edit-outline",
        text: "Customitation",
        href: "/master/custom",
      },
      { icon: "mdi-printer-3d", text: "Product", href: "/master/product" },
      { icon: "mdi-format-list-bulleted", text: "Material", href: "/master/item" },
      {
        icon: "mdi-chart-ppf",
        text: "Production Step",
        href: "/master/production-step",
      },
      {
        icon: "mdi-store",
        text: "Warehouse",
        href: "/master/warehouse",
      },

      {
        icon: "mdi-currency-btc",
        text: "Currency",
        href: "/master/currency",
      },
      {
        icon: " mdi-ruler",
        text: "Unit",
        href: "/master/unit",
      },

      {
        icon: "mdi-credit-card-check",
        text: "PPH",
        href: "/master/pph",
      },
      {
        icon: "mdi-wallet-plus",
        text: "Payment Method",
        href: "/master/payment-method",
      },
    ],
    model: 1,
  }),

  components: {
    MainLayout,
    BaseHeader,
  },
};
</script>
