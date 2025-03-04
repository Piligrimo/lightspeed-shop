<template>
  <TransitionGroup name="errors" tag="div" class="errors">
    <div class="errors__item" v-for="error in errors" :key="error.id">
      <h3 class="errors__message">❌ {{ error.message }}</h3>
      <span class="errors__cross" @click="removeError(error.id)">×</span>
    </div>
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "MyErrorDisplay",
  computed: {
    ...mapState(["errors"]),
  },
  methods: {
    ...mapMutations({ removeError: "REMOVE_ERROR" }),
  },
});
</script>

<style scoped>
.errors {
  position: fixed;
  bottom: 30px;
  width: 100%;
}

.errors-enter-active,
.errors-leave-active {
  transition: all 0.5s ease;
}
.errors-enter-from,
.errors-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.errors__item {
  background-color: #fff;
  padding: 15px 20px;
  width: 300px;
  margin: 5px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.37);
  -moz-box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.37);
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.37);
}
.errors__message {
  margin: 0;
  text-align: start;
  color: #ff0000;
}
.errors__cross {
  font-size: 28px;
  cursor: pointer;
  line-height: 0.7;
}
</style>
