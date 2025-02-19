<template>
  <div class="home">
    <h2>Categories</h2>
    <section class="home__categories">
      <div
        class="home__category"
        v-for="category in categories"
        :key="category.id"
      >
        <router-link :to="`/category/${category.id}`">
          <div class="home__category-image">
            <img
              v-if="category.thumbnailUrl"
              :src="category.thumbnailUrl"
              :alt="category.name"
            />
          </div>
          <h3>{{ category.name }}</h3>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { getCategories } from "@/api";
import { Category } from "@/api/types";

import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
  data() {
    return {
      categories: new Array<Category>(),
    };
  },
  async mounted() {
    const categories = await getCategories();
    this.categories = categories.items;
  },
});
</script>

<style scoped>
.home__categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 600px;
  margin: auto;
  margin-top: 64px;
}
.home__category-image {
  width: 200px;
  height: 200px;
  background-color: #757575;
  margin: auto;
}

.home__category:hover {
  transform: scale(1.05);
  transition: all 0.2s ease-in-out;
}
</style>
