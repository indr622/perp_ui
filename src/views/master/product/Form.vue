<template>
  <div>
    <v-row class="mx-1 mt-2">
      <base-column :lg="4" :md="6" :sm="12">
        <v-text-field label="Item Code" outlined dense v-model="form.name" :rules="rule_name"></v-text-field>
      </base-column>
      <base-column :lg="3" :md="6" :sm="12">
        <v-text-field v-model="form.item_name" placeholder="Material Name" outlined dense readonly
          :append-icon="'mdi-magnify'" @click:append="openItemDialog()"></v-text-field>
      </base-column>

      <base-column :lg="3" :md="6" :sm="12">
        <v-text-field readonly placeholder="Retailer Name" v-model="form.retailer_name" outlined dense
          :append-icon="'mdi-magnify'" @click:append="openRetailerDialog()"></v-text-field>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12"></base-column>
    </v-row>
    <v-row class="mx-1">
      <base-column :lg="4" :md="6" :sm="12">
        <v-textarea rows="2" label="Item Description" outlined dense v-model="form.description"></v-textarea>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12">
        <v-select dense :items="UNITS" v-model="form.unit_id" item-text="name" item-value="id" label="Unit Name"
          outlined></v-select>
      </base-column>
    </v-row>
    <base-sub-title title="Specification" />
    <v-row class="mx-1">
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field type="number" label="Thickness" outlined dense v-model="form.thick"></v-text-field>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field type="number" label="Width" outlined dense v-model="form.width"></v-text-field>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field type="number" label="Length" outlined dense v-model="form.length"></v-text-field>
      </base-column>

      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field label="Flap" outlined dense v-model="form.flap"></v-text-field>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field label="Gusset" outlined dense v-model="form.gusset"></v-text-field>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field label="Pillow Bag" outlined dense v-model="form.pillow_bag"></v-text-field>
      </base-column>
    </v-row>

    <v-row class="mx-1">
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field label="Pillow Fold" outlined dense v-model="form.pillow_fold"></v-text-field>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field type="number" label="Air Hole" outlined dense v-model="form.airhole"></v-text-field>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field type="number" label="Sealtape" outlined dense v-model="form.sealtape"></v-text-field>
      </base-column>

      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field label="Sealtape Type" outlined dense v-model="form.sealtape_type"></v-text-field>
      </base-column>
      <base-column :lg="2" :md="6" :sm="12">
        <v-text-field label="Color" outlined dense v-model="form.color"></v-text-field>
      </base-column>

      <base-column :lg="4" :md="6" :sm="12">
        <v-text-field v-model="form.price" label="Price Source" outlined dense readonly></v-text-field>
      </base-column>
      <base-column :lg="4" :md="6" :sm="12">
        <v-text-field v-model="form.price_buy" label="Price Buy" outlined dense></v-text-field>
      </base-column>
    </v-row>
    <v-row class="mx-1">
      <base-column :lg="2" :md="4" :sm="12">
        <v-switch dense label="Perforation" v-model="form.perforation">
        </v-switch>
      </base-column>
      <base-column :lg="2" :md="4" :sm="12">
        <v-switch dense label="Printing" v-model="form.printing"> </v-switch>
      </base-column>
      <base-column :lg="2" :md="4" :sm="12">
        <v-switch dense label="USE" v-model="form.is_active"> </v-switch>
      </base-column>
    </v-row>

    <!-- dialog product -->
    <v-dialog v-model="retailerDialog" max-width="1200px" persistent>
      <retailer-modal v-on:closeRetailerDialog="closeRetailerDialog" v-on:selectRetailer="selectRetailer" />
    </v-dialog>
    <!-- end dialog product -->

    <!-- dialog item -->
    <v-dialog v-model="itemDialog" max-width="1200px" persistent>
      <item-modal v-on:closeItemDialog="closeItemDialog" v-on:selectItem="selectItem" />
    </v-dialog>
    <!-- end dialog item -->
  </div>
</template>


<script>
import RetailerModal from "@/components/modal/RetailerModal";
import ItemModal from "@/components/modal/ItemModal";
import BaseColumn from "@/components/base/BaseColumn";
import BaseSubTitle from "@/components/base/BaseSubTitle";
import { mapGetters, mapState } from "vuex";
export default {
  name: "ProductForm",
  data() {
    return {
      retailerDialog: false,
      itemDialog: false,
    };
  },
  created() {
    this.getUnit();
  },
  methods: {
    getUnit: async function () {
      await this.$axios
        .get("/units?active=1", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.$store.commit("unit/SET_UNIT", data.units);
        });
    },
    selectRetailer(val) {
      this.$store.commit("product/SET_RETAILER", val);
    },

    selectItem(val) {
      this.$store.commit("product/SET_ITEM", val);
    },

    closeRetailerDialog() {
      this.retailerDialog = false;
    },
    openRetailerDialog() {
      this.retailerDialog = true;
    },
    closeItemDialog() {
      this.itemDialog = false;
    },
    openItemDialog() {
      this.itemDialog = true;
    },
  },
  computed: {
    ...mapState("product", {
      form: (state) => state.form,
    }),
    ...mapGetters("unit", {
      UNITS: "Units",
    }),
  },

  destroyed() {
    this.$store.commit("product/CLEAR_FORM");
  },
  components: {
    BaseColumn,
    BaseSubTitle,
    "retailer-modal": RetailerModal,
    "item-modal": ItemModal,
  },
};
</script>