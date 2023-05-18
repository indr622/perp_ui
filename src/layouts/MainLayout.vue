<template>
    <div>
        <v-app-bar app elevation="0" color="#fff">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title></v-toolbar-title>
            <v-spacer></v-spacer>
            <notification/>
            <v-menu :close-on-content-click="true" origin="center center" transition="scale-transition" :offset-y="true"
                    bottom
                    left ml-1>
                <template v-slot:activator="{ on }">
                    <v-avatar size="30" class="on_cursor mx-3">
                        <img src="@/assets/user_default.png" v-on="on"
                             alt="Image"/>
                    </v-avatar>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-avatar>
                            <img src="@/assets/user_default.png" alt="IMage"/>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="title">
                                {{ USER.name ? USER.name : "N/A" }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <span class="card">{{ USER.role ? USER.role : "N/A" }}</span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider/>
                    <v-list-item @click.prevent="logout">
                        <v-list-item-icon class="mr-2">
                            <v-icon>mdi-power</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>LOGOUT</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer width="240" dark color="darkblue" app v-model="drawer">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        <img src="@/assets/gmk_logo_white.svg" class="mx-5" alt="Image Logo"/>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item-group color="#898F99" v-model="group">
                <v-list-item-title class="ml-4 mb-2" style="font-size: 14px"
                                   v-if="CAN('Manage-Master')">Master
                </v-list-item-title>

                <v-list-item to="/master/account-settings" v-if="CAN('Manage-Master')">
                    <v-list-item-icon>
                        <v-icon>mdi-wrench</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="font-size: 14px">Master Management</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item-title class="ml-4 my-2" style="font-size: 14px">Management</v-list-item-title>
                <v-list-item to="/dashboard">
                    <v-list-item-icon>
                        <v-icon>mdi-tune-vertical</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="font-size: 14px">Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group :value="false" prepend-icon="mdi-cart-outline">
                    <template v-slot:activator>
                        <v-list-item-title style="font-size: 14px">Orders</v-list-item-title>
                    </template>
                    <v-list-item class="ml-3" to="/quotation" v-if="CAN('Quotation-View')">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Quotation</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="ml-3" to="/sales-order">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Sales Order</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="ml-3" to="/order-summary">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Order Summary</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-sitemap">
                    <template v-slot:activator>
                        <v-list-item-title style="font-size: 14px">Production</v-list-item-title>
                    </template>
                    <v-list-item class="ml-3" to="/work-order">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Work Order</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="ml-3" to="/work-progress">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Work Progress</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="ml-3" to="/wip">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">WIP</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-sitemap">
                    <template v-slot:activator>
                        <v-list-item-title style="font-size: 14px">Inventory</v-list-item-title>
                    </template>
                    <v-list-item class="ml-3" to="/inventory-in">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Inventory In</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="ml-3" to="/inventory-out">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Inventory Out</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-dolly">
                    <template v-slot:activator>
                        <v-list-item-title style="font-size: 14px">Purchase</v-list-item-title>
                    </template>
                    <v-list-item class="ml-3" to="/purchase-order">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Purchase Order</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="ml-3" to="/purchase-shipping">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Shipping</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-receipt-text">
                    <template v-slot:activator>
                        <v-list-item-title style="font-size: 14px">Sales Invoices</v-list-item-title>
                    </template>
                    <v-list-item class="ml-3" to="/sales-invoice">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Sales Invoice</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="ml-3">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: 14px">Sales Adjustment</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-item @click="openAccounting" active-class="active">
                    <v-list-item-icon>
                        <v-icon>mdi-open-in-new</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="font-size: 14px">Accounting Link</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-navigation-drawer>
        <v-main class="mx-1 mr-4 mb-4">
            <slot/>
        </v-main>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
import Notification from "@/components/notification/Notification.vue";

export default {
    name: "MainLayout",
    data: () => ({
        drawer: true,
        group: null,
        loginTime: 0,
    }),
    methods: {
        logout() {
            this.loginTime = 0;
            this.$store.dispatch("auth/logout");
            localStorage.removeItem("P-ERP-Application");
            this.$router.push("/");
        },

        openAccounting() {
            window.open("http://localhost:8080", "_blank");
        },
    },
    computed: {
        ...mapGetters("auth", {
            AUTHENTICATED: "Authenticated",
            USER: "User",
            CAN: "Can",
        }),
    },
    watch: {
        loginTime: {
            handler(value) {
                if (value >= 0) {
                    setTimeout(() => {
                        this.loginTime = this.AUTHENTICATED === true ? this.loginTime + 1 : -1;
                    }, 1000);
                } else {
                    this.$store.dispatch("auth/logout");
                    this.$router.replace("/login");
                }
            },
            immediate: true,
        },
        group() {
            this.drawer = true;
        },
    },
    components: {
        Notification,
    },
};
</script>