<template>
  <div class="cart">
    <h2>Cart</h2>
    <div v-if="!filteredCartItems.length">
      <p>Cart is empty</p>
      <router-link to="/"
        ><button class="button _small">Go shopping</button></router-link
      >
    </div>
    <template v-else>
      <table>
        <tr v-for="item in filteredCartItems" :key="item.id">
          <td align="left">
            <b>{{ item.name }}</b>
          </td>
          <td align="right" width="60px">{{ item.price.toFixed(2) }}€</td>
          <td align="left" width="20px">x{{ item.quantity() }}</td>
          <td @click="remove(item.id)">➖</td>
          <td @click="add(item.id)">➕</td>
          <td align="right" width="80px">
            {{ (item.price * item.quantity()).toFixed(2) }} €
          </td>
        </tr>
        <tr class="cart__total-row">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td align="left"><b>total:</b></td>
          <td align="right" width="80px">
            <b>{{ totalPrice.toFixed(2) }} €</b>
          </td>
        </tr>
      </table>
      <button class="button _buy" @click="buy">BUY</button>
    </template>
    <my-modal v-if="isModalVisible" @close="isModalVisible = false">
      Thank you for your purchase!
      <div class="cart__buttons">
        <router-link to="/">
          <button class="button _small" @click="isModalVisible = false">
            Home
          </button>
        </router-link>
        <button
          class="button _secondary _small"
          @click="isModalVisible = false"
        >
          OK
        </button>
      </div>
    </my-modal>
  </div>
</template>

<script lang="ts">
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

import { defineComponent } from "vue";
import MyModal from "@/components/MyModal.vue";

export default defineComponent({
  name: "CartView",
  components: { MyModal },

  data() {
    return {
      isModalVisible: false,
    };
  },
  async mounted() {
    this.fetchCartItems();
  },
  computed: {
    ...mapState({
      cartItems: "productsInCart",
    }),
    ...mapGetters({
      totalPrice: "TOTAL_PRICE",
      filteredCartItems: "FILTERED_CART_ITEMS",
    }),
  },
  methods: {
    ...mapActions({
      fetchCartItems: "FETCH_CART_ITEMS",
    }),
    ...mapMutations({
      add: "ADD_TO_CART",
      remove: "REMOVE_FROM_CART",
      resetCart: "RESET_CART",
    }),
    buy() {
      this.isModalVisible = true;
      this.resetCart();
    },
  },
});
</script>

<style>
.cart__total-row {
  margin-top: 1px;
  border-top: 1px solid black;
}
table {
  margin: 32px auto;
}
td {
  vertical-align: top;
}
.button._buy {
  width: 180px;
  margin: auto;
}
.cart__buttons {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 16px;
}
</style>
