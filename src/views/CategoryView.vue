<template>
  <div class="category">
    <h2>{{ (category && category.name) || "Loading..." }}</h2>
    <section class="category__products">
      <div
        v-for="product in products"
        :key="product.id"
        class="category__product"
      >
        <router-link :to="`/product/${product.id}`">
          <img
            class="category__product-img"
            :src="product.thumbnailUrl"
            :alt="product.name"
          />
          <h4 class="category__product-name">{{ product.name }}</h4>
          <p class="category__product-price">{{ product.price }} €</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { getCategoryById, getProducts } from "@/api";
import { Category, Product } from "@/api/types";

import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
  data() {
    return {
      category: null as Category | null,
      products: new Array<Product>(),
    };
  },
  async mounted() {
    const id = this.$route.params.id as string;
    this.category = await getCategoryById(id);
    const products = await getProducts(id);
    this.products = products.items;
  },
});
</script>

<style>
.category__product:hover {
  transform: scale(1.05);
  transition: all 0.2s ease-in-out;
}
.category__product-img {
  width: 100%;
}
.category__product-name {
  text-align: left;
  margin-bottom: 2px;
  margin-top: 8px;
}

.category__product-price {
  margin: 0 0 16px 0;
  text-align: left;
}
.category__products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 600px;
  margin: auto;
  margin-top: 64px;
  gap: 32px;
}
</style>
