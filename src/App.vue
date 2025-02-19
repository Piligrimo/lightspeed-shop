<template>
  <header class="app__header">
    <router-link to="/">
      <h1>Lightspeed Shop</h1>
    </router-link>
    <router-link to="/cart">
      <div class="app__cart">
        <div v-if="totalItemsInCart" class="app__cart-quantity">
          {{ totalItemsInCart }}
        </div>
        <h1>🛒</h1>
      </div>
    </router-link>
  </header>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "App",
  computed: {
    ...mapGetters({ totalItemsInCart: "TOTAL_ITEMS_IN_CART" }),
    ...mapState(["cart"]),
  },
  methods: {
    ...mapMutations({ setCart: "SET_CART" }),
  },
  mounted() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.setCart(cart);
    addEventListener("beforeunload", () => {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    });
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app__header {
  display: flex;
  justify-content: space-between;
  padding: 0 64px;
  border-bottom: #cdcdcd 1px solid;
  margin-bottom: 32px;
}
.app__cart {
  position: absolute;
}
.app__cart-quantity {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #e43c3c;
  color: white;
  border-radius: 7.5px;
  height: 15px;
  display: flex;
  padding: 0 5px;
  justify-content: center;
  align-items: center;
  font-size: 10px;
}

a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: #2c3e50;
}
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

.button._small {
  font-size: 12px;
  padding: 8px 16px;
  margin-top: 8px;
  width: fit-content;
}
.button:hover {
  transform: scale(1.01);
}
.button:active {
  transform: scale(0.98);
}
</style>
