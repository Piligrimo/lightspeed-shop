<template>
  <div class="loading">◌</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyLoader",
});
</script>

<style scoped>
.loading {
  font-size: 80px;
  line-height: 80px;
  width: 80px;
  color: #9c9c9c;
  animation-name: spin;
  margin: auto;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  50% {
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
