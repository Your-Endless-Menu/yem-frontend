<script setup>
import UserAccountLogo from '@/components/common/UserAccountLogo.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'
import { BASE_URL } from '@/utils/consts.js'
import { store } from '@/store/index.js'
const isAccountOpened = ref(false)
const handleToggleAccount = () => {
  isAccountOpened.value = !isAccountOpened.value
}

const handleLogout = () => {
  mutate()
  store.commit('logout')
}

const { mutate } = useMutation({
  mutationFn: () => axios.post(`${BASE_URL}/auth/logout`)
})

const handleClickOutside = (event) => {
  const accountWrapper = document.querySelector('.header-account-wrapper')
  if (accountWrapper && !accountWrapper.contains(event.target)) {
    isAccountOpened.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="header-account-wrapper">
    <UserAccountLogo @click="handleToggleAccount" />
    <div class="user-account" v-if="isAccountOpened">
      <ul class="user-account-list">
        <li class="user-account-item">
          <router-link to="/my-menu" @click="handleToggleAccount"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"
              />
            </svg>
            My Menu</router-link
          >
        </li>
        <li class="user-account-item">
          <router-link to="/settings" @click="handleToggleAccount">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
              /></svg
            >Settings</router-link
          >
        </li>
        <li class="user-account-item" @click="handleToggleAccount">
          <button @click="handleLogout">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
              /></svg
            >Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
.header-account-wrapper {
  position: relative;
}
.user-account {
  position: absolute;
  width: 180px;
  background-color: $white;
  border-radius: 5px;
  box-shadow: $box-shadow;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.user-account-item {
  &:first-child {
    a {
      border-radius: 5px 5px 0 0;
    }
  }
  a,
  button {
    padding: 20px;
    color: $black;
    display: flex;
    gap: 8px;
    font-size: $fs-18;

    transition: $transition;
    svg {
      width: 20px;
      height: 20px;
      path {
        transition: $transition;
        fill: $black;
      }
    }

    &:hover {
      background-color: $primary;
      color: $white;

      svg {
        path {
          fill: $white;
        }
      }
    }
  }

  button {
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border-radius: 0 0 5px 5px;
  }
}
</style>
