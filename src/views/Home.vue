<template>
  <div>
    <div align="center" v-if="!user.isloggedIn">
      <v-img
        lazy-src="img/vm.jpg"
        max-width="500"
        src="img/vm.jpg"
      ></v-img>
      <h3 class="mt-5">
        Vending machine app for buying and selling products
      </h3>
    </div>
    <div v-if="user.isloggedIn">
    <!-- here, role checking and include seller or buyer component listing-->
      <div v-if="user.roles === 'seller'">
        <ProductList />
      </div>
      <div v-else>
        buyer list
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductList from "@/components/ProductList";

export default {
  name: "Home",
  components: { ProductList },
  computed: {
    ...mapGetters("user", ["user"]),
  },
  // methods: {
  //   ...mapActions("products", ["getProductList"]),
  // },
  // async created() {
  //   if (this.user.isloggedIn) {
  //     await this.getProductList();
  //   }
  // },
};
</script>
