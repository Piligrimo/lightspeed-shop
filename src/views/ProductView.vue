<template>
  <div class="product">
    <h1 v-if="!product">Loading...</h1>
    <div class="product__container" v-else>
      <div class="product__info">
        <img
          class="product__image"
          :src="product.thumbnailUrl"
          :alt="product.name"
        />
        <button class="button">ADD TO CART</button>
        <button class="button _secondary" @click="$router.back()">BACK</button>
      </div>
      <div class="product__info">
        <h2 class="product__name">{{ product.name }}</h2>
        <h3 class="product__price">{{ product.price }} €</h3>
        <p class="category__product-description" v-html="product.description" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getProductById } from "@/api";
import { Product } from "@/api/types";

import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
  data() {
    return {
      product: null as Product | null,
    };
  },
  async mounted() {
    const id = this.$route.params.id as string;
    this.product = await getProductById(id);
  },
});
</script>

<style>
.button {
  background-color: #000;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 16px;
  width: 100%;
  cursor: pointer;
}
.button._secondary {
  background-color: #bebebe;
  margin-top: 8px;
  width: 100%;
}
.button:hover {
  transform: scale(1.01);
}
.button:active {
  transform: scale(0.98);
}
.product__price {
  margin-top: 0;
}
.product__name {
  margin: 0;
}
.product__image {
  height: 400px;
}
.product__container {
  display: flex;
  gap: 32px;
  margin: auto;
  max-width: 800px;
}
.product__info {
  text-align: left;
}
</style>
