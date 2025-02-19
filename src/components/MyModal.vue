<template>
  <div class="modal">
    <div class="modal__card">
      <span class="modal__cross" @click="$emit('close')">×</span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyModal",
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__card {
  position: relative;
  max-width: 500px;
  background-color: white;
  padding: 24px;
}
.modal__cross {
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  line-height: 0.7;
}
</style>
