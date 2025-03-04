<template>
  <div class="product">
    <my-loader v-if="isPending || !product" />
    <div class="product__container" v-else>
      <div class="product__info">
        <img
          class="product__image"
          :src="product.thumbnailUrl"
          :alt="product.name"
        />
        <button v-if="!quantity" class="button" @click="add(product.id)">
          ADD TO CART
        </button>
        <template v-else>
          <div class="product__quantity">
            <p class="product__change-quantity" @click="remove(product.id)">
              ➖
            </p>
            <p>{{ quantity }}</p>
            <p class="product__change-quantity" @click="add(product.id)">➕</p>
          </div>
          <router-link :to="'/cart'">
            <button class="button">CART</button>
          </router-link>
        </template>

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
import { mapGetters, mapMutations } from "vuex";

import { defineComponent } from "vue";
import MyLoader from "@/components/MyLoader.vue";

export default defineComponent({
  name: "ProductView",
  components: { MyLoader },

  data() {
    return {
      product: null as Product | null,
      isPending: false,
    };
  },
  async mounted() {
    const id = this.$route.params.id as string;
    this.isPending = true;
    this.product = await getProductById(id);
    this.isPending = false;
    this.setCurrentProduct(id);
  },
  methods: {
    ...mapMutations({
      setCurrentProduct: "SET_CURRENT_PRODUCT",
      add: "ADD_TO_CART",
      remove: "REMOVE_FROM_CART",
    }),
  },
  computed: {
    ...mapGetters({ quantity: "QUANTITY_OF_CURRENT_PRODUCT_IN_CART" }),
  },
});
</script>

<style scoped>
.product__quantity {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
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
.product__change-quantity {
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  user-select: none;
}
</style>
