<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>
      <span class="text-h5  mx-auto">{{ product.productName }}</span> 
    </v-card-title>

    <v-card-title>
      <span class="text-h3 mx-auto">{{ product.cost }}</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <span class="subheading">Amount available: {{product.amountAvailable}}</span>
    </v-card-text>

    <v-card-title class="d-flex justify-space-around">
      <v-btn
        @click="buyAmount < product.amountAvailable && buyAmount++ "
      >
        +
      </v-btn>
      <v-btn
        @click="buyAmount > 1 && buyAmount-- "
      >
        -
      </v-btn
      >
      <span>{{buyAmount}}</span>
    </v-card-title>

    <v-card-actions>
      <v-btn
        block
        class="white--text mt-4"
        color="deep-purple accent-4"
        @click="onBuy(product.id)"
      >
        Buy
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import {  mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("buy", ["buyProduct"]),
    async onBuy(id) {
      await this.buyProduct({id, amount: this.buyAmount})
    },
  },
  props: ['product'],
  data: () => ({
    buyAmount: 1,
  })
}

</script>