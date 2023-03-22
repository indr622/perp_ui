<template>
    <div>
        <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
            <v-toolbar-title> Product List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn outlined small class="ma-1" color="primary" @click="openProductDialog(SalesOrder.retailer_id)"
                v-if="SalesOrder.retailer_id">
                Add Product
                <v-icon right>mdi-plus</v-icon>
            </v-btn>
        </v-app-bar>

        <v-simple-table class="mx-2 mb-3" fixed-header>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left" width="1%">#</th>
                        <th class="text-left" width="25%">Product Name</th>
                        <th class="text-left" width="5%">Item Name</th>
                        <th class="text-left" width="5%">Unit</th>
                        <th class="text-left" width="10%">Price Source</th>
                        <th class="text-left" width="13%">Price Sell <span class="error--text">/100</span></th>
                        <th class="text-left" width="15%">Qty</th>
                        <th class="text-left" width="12%">Amount</th>
                        <th class="text-left" width="12%">Remark</th>
                        <th class="text-left" width="1%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr height="80" v-for="(row, index) in SalesOrder.product_list" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                            {{ row.product_name ?? row.product.name }}

                            <br />
                            <v-chip small color="primary" text-color="white">
                                Thick :{{ row.thick ?? row.product.thick }}
                            </v-chip>
                            <v-chip small color="primary" text-color="white">
                                Width :{{ row.width ?? row.product.width }}
                            </v-chip>
                            <v-chip small color="primary" text-color="white">
                                Length :{{ row.length ?? row.product.length }}
                            </v-chip>

                            <v-chip small color="primary" text-color="white">
                                Print :{{ row.printing ?? row.product.printing }}
                            </v-chip>
                        </td>
                        <td>
                            <b> {{ row.item_name ?? row.product.item.name }} </b>
                        </td>
                        <td>{{ row.unit_name ?? row.product.unit.name }}</td>
                        <td>
                            <b> {{ row.price ?? row.product.price | currency("", 2, { symbolOnLeft: false }) }}
                            </b>
                        </td>
                        <td>
                            <v-text-field type="number" v-model="row.price_sell" placeholder="Price Sell" outlined dense
                                hide-details></v-text-field>
                            <span class="error--text" v-if="row.price_sell < 0">Input not valid</span>
                        </td>
                        <td>
                            <v-text-field v-model="row.qty" placeholder="Qty" type="number" outlined dense hide-details
                                :rules="rule_qty"></v-text-field>
                            <span class="error--text" v-if="row.qty < 0">Input not valid</span>
                        </td>
                        <td>
                            <b>
                                {{
                                    row.amount = (row.price_sell * row.qty / 100) | currency("", 2, {
                                        symbolOnLeft: false
                                    })
                                }}
                            </b>
                        </td>
                        <td>
                            <v-textarea v-model="row.remark" dense outlined rows="1" hide-details
                                placeholder="Remark"></v-textarea>
                        </td>
                        <td>
                            <v-icon color="error" @click="removeProduct(index)">mdi-delete
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-simple-table class="mx-2 mb-3" fixed-header>
            <thead>
                <tr>
                    <th class="text-left" width="45%"></th>
                    <th class="text-left" width="10%"></th>
                    <th class="text-left" width="10%"></th>
                    <th class="text-left" width="20%"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <v-textarea label="Term And Condition" v-model="SalesOrder.term_and_condition" dense outlined
                            rows="3" hide-details></v-textarea>
                    </td>
                    <td></td>
                    <td class="text-right">
                        Sub Total : <br />
                        Discount : <br />
                        Aditional Charge : <br />
                        Tax : <br />
                        <h3>Total :</h3>
                    </td>
                    <td>
                        <input type="hidden" v-model="subtotal">
                        <b>{{ sub_total| currency("", 2, { symbolOnLeft: false }) }} </b>
                        <hr />
                        <b>{{ discount| currency("", 2, { symbolOnLeft: false, })}}
                            |
                            <v-icon color="success" small>mdi-arrow-bottom-right-thin
                            </v-icon>
                            <b class="success--text">{{ afterDiscount| currency("", 2, { symbolOnLeft: false })}}</b>
                        </b>
                        <hr />
                        <b>{{ this.SalesOrder.additional_cost | currency("", 2, { symbolOnLeft: false }) }} </b>
                        <hr />
                        <b>{{ tax| currency("", 2, { symbolOnLeft: false })}}</b>
                        <hr />
                        <b class="primary--text"> {{ total| currency("", 2, { symbolOnLeft: false })}}</b>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>

        <v-dialog v-model="dialogProduct" v-if="dialogProduct" max-width="1200px" persistent>
            <products-modal v-on:closeProductDialog="closeProductDialog" v-on:selectProduct="selectProduct" />
        </v-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ProductsModal from "@/components/modal/ProductsModal.vue";
import _ from "lodash";

export default {
    name: "SalesOrderFormItem",
    data() {
        return {
            dialogProduct: false,
        };
    },

    methods: {
        ...mapMutations("sales_order", [
            "SET_SUBTOTAL",
            "SET_DISCOUNT",
            "SET_VAT",
            "SET_ADDITIONAL_COST",
            "SET_TOTAL",
            "SET_PRODUCT_LIST",
        ]),
        openProductDialog() {
            this.dialogProduct = true;
        },
        closeProductDialog() {
            this.dialogProduct = false;
        },
        selectProduct(val) {
            if (this.SalesOrder.product_list.find((item) => item.product_id === val.id)) {
                this.SalesOrder.product_list.find((item) => item.product_id === val.id).qty++;
                return;
            }
            this.SET_PRODUCT_LIST(val);
            this.dialogProduct = false;
        },

        removeProduct(index) {
            this.SalesOrder.product_list.splice(index, 1);
        },
    },
    computed: {
        ...mapState("sales_order", {
            SalesOrder: (state) => state.sales_order,
        }),
        subtotal() {
            return this.SET_SUBTOTAL(this.sub_total ?? 0);
        },
        sub_total() {
            return _.sumBy(this.SalesOrder.product_list, function (t) {
                return (t.price_sell * t.qty) / 100
            });
        },
        discount() {
            if (this.SalesOrder.discount_percent > 100 || this.SalesOrder.discount_percent < 0) {
                this.SET_DISCOUNT(0);
                return "Discount not valid value";
            }
            this.SET_DISCOUNT(
                (this.sub_total * this.SalesOrder.discount_percent) / 100
            );
            return (this.sub_total * this.SalesOrder.discount_percent) / 100;
        },
        afterDiscount() {
            let discount = this.sub_total - this.discount;
            if (discount > 0) {
                return discount;
            } else {
                return 0;
            }
        },
        tax() {
            if (this.SalesOrder.use_vat) {
                this.SET_VAT(((parseFloat(this.SalesOrder.additional_cost) + this.afterDiscount) * 11) / 100);
                return ((parseFloat(this.SalesOrder.additional_cost) + this.afterDiscount) * 11) / 100;
            }
            else {
                this.SET_VAT(0);
                return 0;
            }
        },

        total() {
            this.SET_TOTAL(this.afterDiscount + this.tax + parseFloat(this.SalesOrder.additional_cost));
            return this.afterDiscount + this.tax + parseFloat(this.SalesOrder.additional_cost);
        },
    },

    components: {
        "products-modal": ProductsModal,
    },
};
</script>
