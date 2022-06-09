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
      <div v-if="user.roles === 'seller'">
        <ProductList />
      </div>
      <div v-else>
        <VendingMachine />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductList from "@/components/ProductList";
import VendingMachine from "@/components/VendingMachine";

export default {
  name: "Home",
  components: { ProductList, VendingMachine },
  computed: {
    ...mapGetters("user", ["user"]),
  },
};
</script>
