<template>
  <div>
    <v-row class="mx-1">
      <base-column :lg="4" :md="5" :sm="5">
        <v-text-field
          label="Material Name"
          outlined
          dense
          v-model="form.name"
          :rules="rule_name"
        ></v-text-field>
      </base-column>

      <base-column :lg="4" :md="5" :sm="5">
        <v-autocomplete
          v-model="form.unit_id"
          :items="units"
          dense
          item-text="name"
          item-value="id"
          label="Unit Name"
          outlined
          :rules="rule_unit"
        ></v-autocomplete>
      </base-column>
    </v-row>
    <v-row class="mx-1">
      <base-column :lg="4" :md="5" :sm="5">
        <v-autocomplete
          v-model="form.group_id"
          :items="groups"
          dense
          item-text="name"
          item-value="id"
          label="Group Name"
          outlined
          :rules="rule_group"
          @change="getSubGroup"
        ></v-autocomplete>
      </base-column>
      <base-column :lg="4" :md="5" :sm="5">
        <v-autocomplete
          v-model="form.subgroup_id"
          :items="sub_groups"
          dense
          item-text="name"
          item-value="id"
          label="Sub Group Name"
          outlined
          :rules="rule_subgroup"
        ></v-autocomplete>
      </base-column>
    </v-row>
    <v-row class="mx-1">
      <base-column :lg="4" :md="4" :sm="4">
        <v-text-field
          label="Price Buy"
          dense
          type="number"
          outlined
          v-model="form.price_buy"
        ></v-text-field>
      </base-column>
      <base-column :lg="4" :md="4" :sm="4">
        <v-text-field
          label="Price Sell"
          dense
          type="number"
          outlined
          v-model="form.price_sell"
        ></v-text-field>
      </base-column>
      <base-column :lg="4" :md="4" :sm="4">
        <v-text-field
          label="Price Formula"
          dense
          type="number"
          outlined
          v-model="form.price_formula"
        ></v-text-field
      ></base-column>
    </v-row>
    <v-row class="mx-1">
      <base-column :lg="4" :md="4" :sm="4">
        <v-textarea
          rows="3"
          label="Specification"
          dense
          outlined
          v-model="form.specification"
        ></v-textarea>
      </base-column>
      <base-column :lg="4" :md="4" :sm="4">
        <v-textarea
          rows="3"
          label="Description"
          dense
          outlined
          v-model="form.description"
        ></v-textarea>
      </base-column>
    </v-row>
    <v-row class="mx-1">
      <base-column :lg="4" :md="4" :sm="4">
        <v-switch label="Use" v-model="form.is_active"></v-switch>
      </base-column>
    </v-row>
  </div>
</template>


<script>
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapState } from "vuex";
export default {
  name: "ItemForm",
  components: { BaseColumn },

  created() {
    this.getUnit();
    this.getGroup();
  },

  methods: {
    async getUnit() {
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
    async getGroup() {
      await this.$axios
        .get("/groups", {
          headers: { Authorization: this.$store.getters["auth/Token"] },
        })
        .then(({ data }) => {
          this.$store.commit("group/SET_GROUP", data.groups);
        });
    },
    async getSubGroup() {
      await this.$axios
        .get("/subgroups?group_id=" + this.form.group_id, {
          headers: { Authorization: this.$store.getters["auth/Token"] },
        })
        .then(({ data }) => {
          this.$store.commit("sub_group/SET_SUBGROUP", data.sub_groups);
        });
    },
  },
  computed: {
    ...mapState("item", {
      form: (state) => state.form,
    }),
    ...mapState("unit", {
      units: (state) => state.units,
    }),
    ...mapState("group", {
      groups: (state) => state.groups,
    }),
    ...mapState("sub_group", {
      sub_groups: (state) => state.sub_groups,
    }),
  },
};
</script>