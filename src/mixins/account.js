import { mapGetters } from "vuex";
export const accountSetting = {
    data() {
        return {
            form_data: {},
            form_valid: true,
            btnLoading: false,
            is_active: true,
            show_current: false,
            show_new: false,
            show_confirm: false,
            form_password: "",
            password_dialog: "",
            current_password: "",
            new_password: "",
            rule_username: [(v) => !!v || "Username  please fill in !!!"],
            rule_name: [(v) => !!v || "Name  please fill in !!!"],
            rule_phone: [
                (v) => !!v || "Phone Number  please fill in !!!",
                (v) => /^[0-9]+$/.test(v) || "Phone Number can only be numbers"
            ],
            rule_address: [(v) => !!v || "Address  please fill in !!!"],
            rule_city: [(v) => !!v || "City  please fill in !!!"],
            rule_state: [(v) => !!v || "State  please fill in !!!"],
            rule_zip: [
                (v) => !!v || "ZIP  please fill in !!!",
                (v) => /^[0-9]+$/.test(v) || "ZIP can only be numbers"],
            rule_old: [(v) => !!v || "Old Password  please fill in !!!"],
            rule_new: [(v) => !!v || "New Password  please fill in !!!"],
        }
    },
    computed: {
        ...mapGetters("auth", {
            ACCESS_TOKEN: "AccessToken",
            TOKEN: "Token",
        }),
    }

}
