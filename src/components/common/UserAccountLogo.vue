<script setup>
import { computed } from 'vue'
import { store } from '@/store/index.js'

const user = computed(() => store.getters.getUser)
</script>

<template>
  <div class="user-account-logo">
    {{ user?.name[0] }}
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.user-account-logo {
  background-color: $primary;
  border-radius: 50%;
  color: $white;
  font-size: $fs-24;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
