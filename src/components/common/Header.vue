<script setup>
import HeaderUserAccount from '@/components/common/HeaderUserAccount.vue'
import { store } from '@/store/index.js'
import { computed } from 'vue'
import { Button } from 'vant'

const isAuth = computed(() => store.getters.getIsAuth)
</script>

<template>
  <header>
    <div class="container">
      <div class="wrapper">
        <div class="logo">
          <router-link to="/">
            <span class="left">Your Endless</span> <span class="right"> MENU</span>
          </router-link>
        </div>
        <nav class="menu-nav">
          <ul>
            <li><router-link to="/recipes">All Recipes</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
          <HeaderUserAccount v-if="isAuth" />
          <Button type="primary" v-else url="/login">Login</Button>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
header {
  box-shadow: $box-shadow;
}

.logo {
  font-size: $fs-24;
  font-weight: bold;
  a {
    text-align: center;
  }
  span {
    color: $secondary;
    display: flex;
    flex-direction: column;
  }

  .left {
    font-family: 'MonteCarlo', cursive;
    font-size: $fs-26;
    line-height: 30px;
    margin-right: 10px;
  }

  .right {
    margin-top: 5px;
    display: block;
    font-size: $fs-36;
    line-height: 36px;
    font-family: 'Oswald', sans-serif;
    letter-spacing: 10px;
  }
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.menu-nav {
  display: flex;
  gap: 50px;
  align-items: center;
  ul {
    display: flex;
    gap: 40px;

    a {
      color: $secondary;
      transition: 0.3s;
      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
