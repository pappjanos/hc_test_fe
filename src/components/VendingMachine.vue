<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card
          class="mt-4"
        >
          <v-row class="pa-2">
            <v-col cols="12" md="4" align="center">
              <h2 class="text-h4">
                Balance: {{deposit}}
              </h2>
            </v-col>
            
            <v-col cols="12" md="4">
              <div class="d-flex align-center">
                <span class="pr-2">Coin to deposit:</span>

                <v-chip-group
                  v-model="selection"
                  active-class="deep-purple--text text--accent-4"
                  mandatory
                >
                  <v-chip
                    v-for="size in sizes"
                    :key="size"
                    :value="size"
                  >
                    {{ size }}
                  </v-chip>
                </v-chip-group>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="d-flex">
                <div>
                  <v-btn
                    class="white--text"
                    color="deep-purple accent-4"
                    @click="onAddDeposit"
                  >
                    Deposit
                  </v-btn>
                </div>
                <div class="ml-4">
                  <v-btn
                    class="white--text"
                    color="red"
                    @click="onResetDeposit"
                  >
                    Reset
                  </v-btn>
                </div>
                <div class="ml-4">
                  <v-btn
                    class="white--text"
                    color="green"
                    @click="getProductList"
                  >
                    Reload products
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="12" md="3" lg="2" v-for="(product) in products" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>

    <v-bottom-sheet v-model="sheet" width="100%">
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >
          close
        </v-btn>
        <div class="pa-3" v-if="boughtProduct">
          <div>You have bought {{boughtProduct.amount}} piece<span v-if="boughtProduct.amount > 1">s</span> of {{boughtProduct.productName}}</div>
          <br>
          <div>
            Your change is: {{boughtProduct.changeAmount}}
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductCard from "@/components/ProductCard";
export default {
  components: { ProductCard },
  computed: {
    ...mapGetters("deposit", ["deposit"]),
    ...mapGetters("products", ["products"]),
    ...mapGetters("buy", ["boughtProduct"]),
  },
  watch: {
    boughtProduct: function () {
      this.sheet = true;
    },
  },
  methods: {
    ...mapActions("deposit", ["getDeposit", "updateDeposit", "resetDeposit"]),
    ...mapActions("products", ["getProductList"]),
    async onAddDeposit() {
      await this.updateDeposit(this.selection)
    },
    async onResetDeposit() {
      if (this.deposit > 0) {
        await this.resetDeposit()
      }
    },
  },
  data: () => ({
    change: [],
    sheet: false,
    selection: 5,
    sizes: [
      5, 10, 20, 50, 100,
    ],
  }),
  async created() {
    await this.getDeposit();
    await this.getProductList();
  },
};
</script>

<style></style>
