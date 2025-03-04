import { getSeveralProductsById } from "@/api";
import { CartItem } from "@/api/types";
import { createStore } from "vuex";

export default createStore({
  state: {
    cart: {} as Record<number, number>,
    productsInCart: new Array<CartItem>(),
    currentProduct: null,
    errors: [],
    errorIdTracker: 0,
  },
  getters: {
    QUANTITY_OF_CURRENT_PRODUCT_IN_CART: (state) => {
      if (!state.currentProduct) return 0;
      return state.cart[state.currentProduct] || 0;
    },
    TOTAL_ITEMS_IN_CART: (state) => {
      return Object.values(state.cart).reduce((acc, curr) => acc + curr, 0);
    },
    TOTAL_PRICE: (state) => {
      return state.productsInCart.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity();
      }, 0);
    },
    FILTERED_CART_ITEMS: (state) => {
      return state.productsInCart.filter((item) => item.quantity() > 0);
    },
  },
  mutations: {
    SET_CART(state, cart) {
      state.cart = cart;
    },
    RESET_CART(state) {
      state.cart = {};
      state.productsInCart = [];
    },
    SET_CURRENT_PRODUCT(state, productId) {
      state.currentProduct = productId;
    },
    SET_PRODUCTS_IN_CART(state, productsInCart) {
      state.productsInCart = productsInCart;
    },
    ADD_TO_CART(state, productId) {
      const newCart = JSON.parse(JSON.stringify(state.cart));
      if (!newCart[productId]) {
        newCart[productId] = 1;
      } else {
        newCart[productId] += 1;
      }
      state.cart = newCart;
    },
    REMOVE_FROM_CART(state, productId) {
      const newCart = JSON.parse(JSON.stringify(state.cart));
      newCart[productId] -= 1;
      state.cart = newCart;
    },
    PUSH_ERROR(state, error) {
      const errors = JSON.parse(JSON.stringify(state.errors));
      errors.push(error);
      state.errors = errors;
    },
    REMOVE_ERROR(state, idToRemove) {
      const errors = JSON.parse(JSON.stringify(state.errors)).filter(
        (item: { id: number }) => item.id !== idToRemove
      );
      state.errors = errors;
    },
    INCREMENT_ERROR_ID_TRACKER(state) {
      state.errorIdTracker++;
    },
  },
  actions: {
    async FETCH_CART_ITEMS({ state, commit }) {
      const ids = Object.keys(state.cart).filter(
        (id) => state.cart[id as unknown as number] > 0
      );
      if (!ids.length) return;
      const products = await getSeveralProductsById(ids.join(","));
      const enrichedProducts =
        products &&
        products.items.map((product) => ({
          ...product,
          quantity: () => state.cart[product.id],
        }));
      commit("SET_PRODUCTS_IN_CART", enrichedProducts || []);
    },
    DISPLAY_ERROR({ state, commit }, message) {
      const error = {
        message,
        id: state.errorIdTracker,
      };
      commit("PUSH_ERROR", error);
      setTimeout(() => {
        commit("REMOVE_ERROR", error.id);
      }, 5000);
      commit("INCREMENT_ERROR_ID_TRACKER");
    },
  },
});
