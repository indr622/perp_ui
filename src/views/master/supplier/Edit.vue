<template>
  <div>
    <base-title title="Edit Supplier" subtitle="Please fill in the Supplier information in the form below" />
    <!-- Form -->
    <v-form ref="form_data" v-model="form_valid" lazy-validation>
      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field label="Supplier Name" v-model="form_data.name" :rules="rule_name" outlined dense></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field label="Supplier Email" v-model="form_data.email" outlined dense
            :rules="rule_email"></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field label="Phone Number" v-model="form_data.phone" :rules="rule_phone" outlined
            dense></v-text-field>
        </base-column>
      </v-row>

      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field label="NPWP" v-model="form_data.npwp" outlined dense :rules="rule_npwp"></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field label="Pic Name" v-model="form_data.pic_name" outlined dense></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field label="Owner Name" v-model="form_data.owner" outlined dense></v-text-field>
        </base-column>
      </v-row>

      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field label="Bank Name" v-model="form_data.bank_name" outlined dense></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field v-model="form_data.bank_account_number" label="Bank Account Number" outlined type="number"
            dense></v-text-field>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-text-field label="Bank Account Name" v-model="form_data.bank_account_name" outlined dense></v-text-field>
        </base-column>
      </v-row>
      <v-row class="mx-1 mt-2">
        <base-column :lg="4" :md="6" :sm="12">
          <v-select label="Term of Payment" :rules="rule_term_payment" :items="term_payment"
            v-model="form_data.term_payment_id" item-text="name" item-value="id" outlined dense>
          </v-select>
        </base-column>
        <base-column :lg="4" :md="6" :sm="12">
          <v-textarea :rules="rule_address" label="Address" rows="3" v-model="form_data.address" outlined
            dense></v-textarea>
        </base-column>
      </v-row>

      <v-row class="mx-1">
        <base-column :lg="4" :md="6" :sm="12">
          <v-switch dense v-model="form_data.is_active" label="USE"> </v-switch>
        </base-column>
      </v-row>

      <v-row class="mx-1">
        <back-button />
        <v-btn color="primary" small class="ma-1" @click.stop="update" :loading="btnLoading"
          :disabled="!form_valid || btnLoading">Update <v-icon right>mdi-content-save</v-icon></v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import BackButton from "@/components/base/BackButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters } from "vuex";
export default {
  components: { BaseTitle, BaseColumn, BackButton },
  name: "SupplierCreate",
  data() {
    return {
      btnLoading: false,
      form_valid: true,
      term_payment: [],
      form_data: {
        name: "",
        owner: "",
        phone: "",
        email: "",
        pic_name: "",
        bank_name: "",
        bank_account_number: "",
        bank_account_name: "",
        npwp: "",
        address: "",
        is_active: true,
        term_payment_id: "",
      },
    };
  },

  created() {
    this.findOne();
    this.getTermPayment();
  },

  methods: {

    async getTermPayment() {
      await this.$axios("/term-payment?active=1", {
        headers: {
          Authorization: this.$store.getters["auth/Token"],
        },
      }).then(({ data }) => {
        this.term_payment = data.term_payment;
      });
    },
    update: async function () {
      if (this.$refs.form_data.validate()) {
        this.btnLoading = true;
        await this.$axios
          .post(
            "/supplier/" + this.$route.params.id,
            {
              _method: "PUT",
              name: this.form_data.name,
              owner: this.form_data.owner,
              email: this.form_data.email,
              phone: this.form_data.phone,
              pic_name: this.form_data.pic_name,
              bank_name: this.form_data.bank_name,
              bank_account_number: this.form_data.bank_account_number,
              bank_account_name: this.form_data.bank_account_name,
              npwp: this.form_data.npwp,
              address: this.form_data.address,
              is_active: this.form_data.is_active,
              term_payment_id: this.form_data.term_payment_id,
            },
            {
              headers: {
                Authorization: this.TOKEN,
              },
            }
          )
          .then(() => {
            this.btnLoading = false;
            this.$router.push({ name: "supplier.index" });
          })
          .catch(() => {
            this.btnLoading = false;
          });
      }
    },

    findOne() {
      this.$axios
        .get("/supplier/" + this.$route.params.id, {
          headers: {
            Authorization: this.TOKEN,
          },
        })
        .then(({ data }) => {
          this.form_data.name = data.suppliers.name;
          this.form_data.owner = data.suppliers.owner;
          this.form_data.email = data.suppliers.email;
          this.form_data.phone = data.suppliers.phone;
          this.form_data.pic_name = data.suppliers.pic_name;
          this.form_data.bank_name = data.suppliers.bank_name;
          this.form_data.bank_account_number =
            data.suppliers.bank_account_number;
          this.form_data.bank_account_name = data.suppliers.bank_account_name;
          this.form_data.address = data.suppliers.address;
          this.form_data.npwp = data.suppliers.npwp;
          this.form_data.is_active = data.suppliers.is_active;
          this.form_data.term_payment_id = data.suppliers.term_payment_id;
        })
        .catch(() => {
          this.$router.push({ name: "supplier.index" });
        });
    },
  },

  computed: {
    ...mapGetters("auth", {
      TOKEN: "Token",
    }),
  },
};
</script>