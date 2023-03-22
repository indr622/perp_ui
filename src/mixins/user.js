import { mapGetters } from "vuex";

export const userMixin = {
    data() {
        return {
            datatableLoading: false,

            form_valid: true,
            form_edit_valid: true,
            btnLoading: false,
            expanded: [],
            datatable: [],
            search: "",
            dialogForm: false,
            dialogFormEdit: false,
            dialogFormReset: false,
            editedIndex: -1,
        }
    },
    created() {
        this.initialize();
    },
    methods: {
        dataTableRowClicked(item) {
            if (item === this.expanded[0]) {
                this.expanded = [];
            } else {
                this.expanded = [item];
            }
        },

        editItem(item) {
            this.id = item.id;
            this.form_data = Object.assign({}, item);
            this.dialogFormEdit = true;
        },
        closeDialog() {
            this.dialogDetailItem = false;
            setTimeout(() => {
                this.form_data = Object.assign({}, this.form_default);
                this.editedIndex = -1;
            }, 200);
        },
        closedialogForm() {
            this.dialogForm = false;
            setTimeout(() => {
                this.form_data = Object.assign({}, this.form_default);
                this.$refs.form_data.reset();
                this.editedIndex = -1;
            }, 200);
        },
        closedialogFormEdit() {
            this.dialogFormEdit = false;
            setTimeout(() => {
                this.form_data = Object.assign({}, this.form_default);
                this.$refs.form_data.reset();
                this.editedIndex = -1;
            }, 200);
        },
        getColor(is_active) {
            if (is_active == 1) return "success";
            return "error";
        },
    },
    computed: {
        ...mapGetters("auth", {
            ACCESS_TOKEN: "AccessToken",
            TOKEN: "Token",
        }),
    }


}
