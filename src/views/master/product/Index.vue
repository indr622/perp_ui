 <template>
  <div>
    <base-title title="Products" subtitle="List Data Products" />
    <v-btn
      to="/master/product/create"
      small
      elevation="1"
      color="primary"
      class="ma-3 white--text float-right"
      @click="loader = 'loading3'"
    >
      Create
      <v-icon right dark>mdi-plus-circle </v-icon>
    </v-btn>

    <product-list />
  </div>
</template>

<script>
import ProductList from "@/views/master/product/List";
import BaseTitle from "@/components/base/BaseTitle";
export default {
  name: "ProductView",

  data() {
    return {
      form_valid: true,
      expanded: [],
      search: {
        status: null,
        keyword: null,
      },
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "Retailer Name", value: "retailer.name" },
        { text: "Item Code", value: "name" },
        { text: "Thickness", value: "thick" },
        { text: "Width", value: "width" },
        { text: "Length", value: "length" },
        { text: "Flap", value: "flap" },
        { text: "Gusset", value: "gusset" },
        { text: "Pillow Bag", value: "pillow_bag" },
        { text: "Pillow Fold", value: "pillow_fold" },
        { text: "Air Hole", value: "airhole" },
        { text: "Sealtape", value: "sealtape" },
        { text: "Price Source", value: "price" },
        { text: "Status", value: "is_active" },
        { text: "Action", value: "actions", sortable: false, width: 100 },
      ],
    };
  },

  components: {
    BaseTitle,
    "product-list": ProductList,
  },
};
</script>