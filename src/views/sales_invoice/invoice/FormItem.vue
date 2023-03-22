<template>
      <div>
            <v-simple-table class="mx-2 mb-3" fixed-header v-if="this.$store.state.sales_invoice.from_so">
                  <template v-slot:default>
                        <thead>
                              <tr>
                                    <th class="text-left" width="1%">#</th>
                                    <th class="text-left" width="25%">Product Name</th>
                                    <th class="text-left" width="5%">Item Name</th>
                                    <th class="text-left" width="5%">Unit</th>
                                    <th class="text-left" width="10%">Price Source</th>
                                    <th class="text-left" width="13%">Price Sell <span class="error--text">/100</span>
                                    </th>
                                    <th class="text-left" width="15%">Qty</th>
                                    <th class="text-left" width="12%">Amount</th>
                                    <th class="text-left" width="12%">Remark</th>
                                    <th class="text-left" width="1%">Actions</th>
                              </tr>
                        </thead>
                        <tbody>
                              <tr height="80" v-for="(row, index) in SalesInvoice.product_list" :key="index">
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
                                    <td><b> {{
                                          row.price ?? row.product.price | currency("", 2, {
                                                symbolOnLeft: false
                                          })
                                    }}</b>
                                    </td>
                                    <td>
                                          <b>{{ row.price_sell | currency("", 2, { symbolOnLeft: false }) }}</b>
                                    </td>
                                    <td>
                                          <v-text-field v-model="row.qty" placeholder="Qty" type="number" outlined dense
                                                hide-details :rules="rule_qty"></v-text-field>
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
                              <th class="text-left" width="40%"></th>
                              <th class="text-left" width="20%"></th>
                              <th class="text-left" width="25%"></th>
                        </tr>
                  </thead>
                  <tbody>
                        <tr>
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
                                    <b>{{ discount| currency("", 2, { symbolOnLeft: false }) }} </b>
                                    <hr />
                                    <b>{{
                                          this.SalesInvoice.additional_cost | currency("", 2, { symbolOnLeft: false })
                                    }} </b>

                                    <hr />
                                    <b>{{ tax| currency("", 2, { symbolOnLeft: false })}}</b>
                                    <hr />
                                    <b class="primary--text"> {{ total| currency("", 2, { symbolOnLeft: false }) }}</b>
                              </td>
                        </tr>
                  </tbody>
            </v-simple-table>

      </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
      name: "FormItemInvoice",

      data() {
            return {
                  headers_product: [
                        { text: "Item Code", value: "product_name", width: 200 },
                        { text: "Description", value: "description", width: 200 },
                        { text: "Unit", value: "product_unit", width: 100 },
                        { text: "Price Buy /100", value: "price_buy", width: 200 },
                        { text: "QTY", value: "qty", width: 140 },
                        { text: "Total Price", value: "total_price", width: 150 },
                        { text: "Remark", value: "remark", width: 100 },
                        { text: "Action", value: "action", sortable: false, width: 100 },
                  ],
                  headers_material: [
                        { text: "Material", value: "item_name", width: 200 },
                        { text: "Unit", value: "item_unit", width: 200 },
                        { text: "Price Buy /100", value: "price_buy", width: 200 },
                        { text: "QTY", value: "qty", width: 150 },
                        { text: "Total Price", value: "total_price", width: 200 },
                        { text: "Remark", value: "remark", width: 100 },
                        { text: "Action", value: "action", sortable: false, width: 100 },
                  ],
                  expanded: [],
                  loading: false,
            };
      },
      methods: {
            ...mapMutations('sales_invoice', [
                  'SET_SUBTOTAL',
                  'SET_DISCOUNT',
                  "SET_VAT",
                  "SET_ADDITIONAL_COST",
                  "SET_TOTAL",

            ]),
            clearForm() {
                  this.CLEAR_FORM();
            },
      },

      computed: {
            ...mapGetters("sales_invoice", {
                  SalesInvoice: "SalesInvoice",
            }),
            subtotal() {
                  return this.SET_SUBTOTAL(this.sub_total ?? 0);
            },
            sub_total() {
                  return _.sumBy(this.SalesInvoice.product_list, function (t) {
                        return (t.price_sell * t.qty) / 100
                  });
            },
            discount() {
                  if (this.SalesInvoice.discount_percent > 100 || this.SalesInvoice.discount_percent < 0) {
                        this.SET_DISCOUNT(0);
                        return "Discount not valid value";
                  }
                  this.SET_DISCOUNT(
                        (this.sub_total * this.SalesInvoice.discount_percent) / 100
                  );
                  return (this.sub_total * this.SalesInvoice.discount_percent) / 100;
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
                  if (this.SalesInvoice.use_vat) {
                        this.SET_VAT(((parseFloat(this.SalesInvoice.additional_cost) + this.afterDiscount) * 11) / 100);
                        return ((parseFloat(this.SalesInvoice.additional_cost) + this.afterDiscount) * 11) / 100;
                  }
                  else {
                        this.SET_VAT(0);
                        return 0;
                  }
            },

            total() {
                  this.SET_TOTAL(this.afterDiscount + this.tax + parseFloat(this.SalesInvoice.additional_cost));
                  return this.afterDiscount + this.tax + parseFloat(this.SalesInvoice.additional_cost);
            },
      },
      components: {

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