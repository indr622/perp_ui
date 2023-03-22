export default {
    data() {
        return {
            rule_name: [(v) => !!v || "Name please fill in !!!"],
            rule_email: [
                (v) => !!v || "Email address please fill in !!!",
                (v) => /.+@.+\..+/.test(v) || "Email address not valid",],
            rule_phone: [
                (v) => !!v || "Phone number please fill in !!!",
                (v) => /^[0-9]+$/.test(v) || "Phone number can only be numbers",
            ],

            rule_description: [
                (value) => !!value || "Description please fill in",
            ],
            rule_address: [
                (v) => !!v || "Address please fill in !!!",
            ],
            rule_npwp: [
                (v) => /^[0-9]+$/.test(v) || "NPWP number can only be numbers",
            ],
            rule_unit: [(v) => !!v || "Unit please fill in !!!"],
            rule_group: [(v) => !!v || "Group please fill in !!!"],
            rule_subgroup: [(v) => !!v || "Sub Group please fill in !!!"],
            rule_disc: [
                (v) => v >= 0 || "Discount cannot be below 0",
                (v) => v <= 100 || "Discount must not be above 100",
            ],
            rule_disc_nominal: [(v) => v >= 0 || "Discount cannot be below 0"],
            rule_qty: [(v) => v >= 0 || "QTY cannot be below 0 or minus value"],
            rule_price: [
                (v) => v >= 0 || "Price cannot be below 0 or minus value",
            ],

            rule_rate: [(v) => v >= 0 || "Rate cannot be below 0"],
            rule_order_date: [(v) => !!v || " Order Date is required"],
            rule_request_date: [(v) => !!v || " Request Date is required"],
            rule_type: [(v) => !!v || "Type  is required"],
            rule_status: [(v) => !!v || "Status  is required"],
            rule_currency: [(v) => !!v || "Currency is required"],
            rule_warehouse: [(v) => !!v || "Warehouse is required"],
            rule_payment_term: [(v) => !!v || "Payment term is required"],
            rule_shipping_term: [(v) => !!v || "Shipping term is required"],
            rule_pph: [(v) => !!v || "PPh is required"],
            rule_ingoing_date: [(v) => !!v || "Ingoing Date is required"],
            rule_term_payment: [(v) => !!v || "Term Of Payment is required"],
            rule_due_date: [(v) => !!v || "Due Date is required"],
            rule_estimation_finish: [(v) => !!v || "Estimation Finish is required"],
            rule_work_order: [(v) => !!v || "Work Order is required"],
        }
    },
};