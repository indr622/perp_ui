<template>
    <v-col xs="12" sm="12" md="12" lg="12">
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
        <v-card elevation="5" rounded>
            <v-spacer></v-spacer>
            <v-row class="mx-1 mb-2">
                <base-column :xs="12" :sm="6" :md="3" :lg="2">
                    <v-banner class="mt-2 summary" outlined rounded single-line>
                        <v-row no-gutters>
                            <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                                <v-avatar color="#DAE3F3" size="40">
                                    <v-icon color="primary">mdi-receipt-text</v-icon>
                                </v-avatar>
                            </v-col>
                            <v-col cols="9" xs="9" sm="9" md="9">
                                <h5 class="primary--text ml-2">TOTAL</h5>
                                <h5 class="ml-2">{{ this.widget.total_sales_order }} Sales Order</h5>
                                <h5 class='primary--text  ml-2'>{{
                                    this.widget.total_sales_order_amount | currency("", 2, {
                                        symbolOnLeft: false
                                    })
                                }}</h5>
                            </v-col>
                        </v-row>
                    </v-banner>
                </base-column>
                <base-column :xs="12" :sm="6" :md="3" :lg="2">
                    <v-banner class="mt-2 summary" outlined rounded single-line>
                        <v-row no-gutters>
                            <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                                <v-avatar color="secondary" size="40">
                                    <v-icon color="#21272D3F">mdi-animation</v-icon>
                                </v-avatar>
                            </v-col>
                            <v-col cols="9" xs="9" sm="9" md="9">
                                <h5 class="secondary--text ml-2">PENDING</h5>
                                <h5 class="ml-2">{{ this.widget.total_sales_order_pending }} Sales Order</h5>
                                <h5 class='secondary--text  ml-2'>{{
                                    this.widget.total_sales_order_pending_amount | currency("", 2, {
                                        symbolOnLeft: false
                                    })
                                }}</h5>
                            </v-col>
                        </v-row>
                    </v-banner>

                </base-column>
                <base-column :xs="12" :sm="6" :md="3" :lg="2">
                    <v-banner class="mt-2 summary" outlined rounded single-line>
                        <v-row no-gutters>
                            <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                                <v-avatar color="#03C988" size="40">
                                    <v-icon color="success">mdi-progress-clock</v-icon>
                                </v-avatar>
                            </v-col>
                            <v-col cols="9" xs="9" sm="9" md="9">
                                <h5 class="success--text ml-2">PROCCESS</h5>
                                <h5 class="ml-2">{{ this.widget.total_sales_order_process }} Sales Order</h5>
                                <h5 class='success--text  ml-2'>{{
                                    this.widget.total_sales_order_process_amount | currency("", 2, {
                                        symbolOnLeft: false
                                    })
                                }}</h5>
                            </v-col>
                        </v-row>
                    </v-banner>
                </base-column>

                <base-column :xs="12" :sm="6" :md="3" :lg="2">
                    <v-banner class="mt-2 summary" outlined rounded single-line>
                        <v-row no-gutters>
                            <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                                <v-avatar color="#F48484" size="40">
                                    <v-icon color="danger">mdi-close-circle-outline</v-icon>
                                </v-avatar>
                            </v-col>
                            <v-col cols="9" xs="9" sm="9" md="9">
                                <h5 class="danger--text ml-2">CANCEL</h5>
                                <h5 class="ml-2">{{ this.widget.total_sales_order_cancel }} Sales Order</h5>
                                <h5 class='danger--text  ml-2'>{{
                                    this.widget.total_sales_order_cancel_amount | currency("", 2, {
                                        symbolOnLeft: false
                                    })
                                }}</h5>
                            </v-col>
                        </v-row>
                    </v-banner>
                </base-column>
            </v-row>
            <v-row class="mx-1 mb-1">
                <v-col xs="12" sm="6" md="2" lg="2">
                    <v-text-field type="date" label="From date" outlined dense v-model="search.from_date">
                    </v-text-field>
                </v-col>
                <v-col xs="12" sm="6" md="2" lg="2">
                    <v-text-field type="date" label="End date" outlined dense v-model="search.end_date">
                    </v-text-field>
                </v-col>
                <v-col xs="12" sm="6" md="2" lg="2">
                    <v-select :items="status" outlined dense attach chips label="Status"
                        v-model="search.status"></v-select>
                </v-col>

                <v-col xs="12" sm="6" md="3" lg="3">
                    <v-text-field type="text" label="Search" outlined dense v-model="search.keyword">
                    </v-text-field>
                </v-col>
                <v-btn small color="darkblue" class="white--text float-end mx-1 mt-3" @click.stop="init">SUbmit <v-icon
                        right>mdi-magnify</v-icon></v-btn>
                <v-btn small color="secondary" class="white--text float-end mx-1 mt-3" @click.stop="clear">Clear
                    <v-icon right>mdi-close-circle-multiple </v-icon>
                </v-btn>
            </v-row>
            <v-data-table :loading="loading" :headers="headers" :items="SALES_ORDERS.data" class="elevation-1"
                hide-default-footer>
                <template v-slot:[`item.so_status`]="{ item }">
                    <v-chip color="secondary" small v-if="item.so_status == 'PENDING'">
                        PENDING
                    </v-chip>
                    <v-chip color="success" small v-else-if="item.so_status == 'FINISH'">
                        FINISH
                    </v-chip>
                    <v-chip color="primary" small v-else-if="item.so_status == 'PROCESS'">
                        ON PROCESS
                    </v-chip>

                    <v-chip color="error" small v-else-if="item.so_status == 'CANCEL'">
                        CANCEL
                    </v-chip>
                    <v-chip color="warning" small v-else-if="item.so_status == 'HOLD'">
                        HOLD
                    </v-chip>
                </template>

                <template v-slot:[`item.so_rate`]="{ item }">
                    <b>{{ item.so_rate | currency("", 2, { symbolOnLeft: false, }) }}</b>
                </template>
                <template v-slot:[`item.so_total`]="{ item }">
                    <b>{{ item.so_total | currency("", 2, { symbolOnLeft: false, }) }}</b>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <v-tooltip color="dark" bottom>
                        <template v-slot:activator="{ on, attrs }" v-if="CAN('Sales-Order-Edit')">
                            <v-btn class="mr-2" color="primary" v-bind="attrs" icon small @click.stop="view(item.id)"
                                v-on="on">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <span>View Sales Order</span>
                    </v-tooltip>
                    <v-tooltip color="dark" bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mr-2" color="warning" v-bind="attrs" icon small @click.stop="edit(item.id)"
                                v-on="on">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit Sales Order</span>
                    </v-tooltip>
                </template>
            </v-data-table>
            <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10"
                :disabled="disabled"></v-pagination>
        </v-card>
    </v-col>
</template>

<script>
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
    name: "SalesOrderList",
    data() {
        return {
            headers: [
                { text: "Sales Order No.", value: "so_number" },
                { text: "Customer", value: "customer.name" },
                { text: "Retailer", value: "retailer.name" },
                { text: "Order Date", value: "so_order_date" },
                { text: "Request Delivery Date", value: "so_request_date" },
                { text: "Currency", value: "currency.name" },
                { text: "Exchange Rate", value: "so_rate" },
                { text: "Status", value: "so_status" },
                { text: "Item Qty", value: "sales_order_details_count" },
                { text: "Total Amount", value: "so_total" },
                { text: "Created By", value: "so_created_by" },
                { text: "Actions", value: "actions", sortable: false },
            ],
            disabled: false,
            loading: false,
            widget: [],
            status: ["PENDING", "PROCESS", "FINISH", "HOLD", "CANCEL"],
            search: {
                from_date: new Date().toJSON().slice(0, 10),
                end_date: new Date().toJSON().slice(0, 10),
                keyword: null,
            },
        };
    },

    methods: {
        ...mapMutations("sales_order", ["CLEAR_STATE", "SET_SALES_ORDERS", "SET_SALES_ORDER"]),

        async init() {
            this.loading = true;
            this.disabled = true;
            let params = {
                page: this.page,
                status: this.search.status,
                keyword: this.search.keyword,
                from_date: this.search.from_date,
                end_date: this.search.end_date,
            };
            await this.$axios
                .get("/sales-order", {
                    params: params,
                    headers: {
                        Authorization: this.$store.getters["auth/Token"],
                    },
                })
                .then(({ data }) => {
                    this.SET_SALES_ORDERS(data.sales_order);
                    this.loading = false;
                    this.disabled = false;
                });
        },
        async getSummary() {
            let params = {
                from_date: this.search.from_date,
                end_date: this.search.end_date,
            };

            await this.$axios
                .get("/sales-order/widget", {
                    params: params,
                    headers: {
                        Authorization: this.$store.getters["auth/Token"],
                    },
                })
                .then(({ data }) => {
                    this.widget = data.data;
                });
        },

        async edit(id) {
            this.loading = true;
            await this.$axios
                .get("/sales-order/" + id, {
                    headers: {
                        Authorization: this.$store.getters["auth/Token"],
                    },
                })
                .then(({ data }) => {
                    this.SET_SALES_ORDER(data.sales_order);
                    this.loading = false;
                    this.$router.push("/sales-order/edit");
                })
                .catch(() => {
                    this.loading = true;
                });
        },
        view(id) {
            this.$router.push("/sales-order/view/" + id);
        },
        searching() {
            this.page = 1;
            this.init();
        },
        clear() {
            this.page = 1;
            this.search = {
                status: "",
                search: "",
                from_date: new Date().toJSON().slice(0, 10),
                end_date: new Date().toJSON().slice(0, 10),
            };
            this.init();
        },
    },

    created() {
        this.init();
        this.getSummary();
    },

    watch: {
        currentPage(newValue) {
            this.page = newValue;
            this.init();
        },
    },
    computed: {
        ...mapGetters("sales_order", {
            SALES_ORDERS: "SalesOrders",
        }),
        ...mapGetters("auth", {
            CAN: "Can",
        }),

        currentPage: {
            get() {
                return this.SALES_ORDERS.current_page;
            },
            set(val) {
                return this.$store.commit("sales_order/SET_CURRENT_PAGE", val);
            },
        },
        lastPage: {
            get() {
                return this.SALES_ORDERS.last_page;
            },
        },
    },
    components: {
        BaseColumn,
    },
};
</script>
<style scoped>
::v-deep .v-data-table-header {
    background-color: #ebebeb59;
}

::v-deep th {
    color: #000 !important;
}
</style>