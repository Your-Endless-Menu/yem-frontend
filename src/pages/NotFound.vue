<script setup>
import { Button } from 'vant'
</script>

<template>
  <div class="not-found-wrapper">
    <div class="image">
      <span class="four">4</span>
      <img src="@/assets/images/egg.png" alt="404" />
      <span class="four">4</span>
    </div>
    <h1>Oops!</h1>
    <h2>It looks like you got lost.</h2>
    <Button type="primary" url="/">Go home?</Button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
.not-found-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  align-items: center;
}

h1 {
  margin-top: 20px;
  font-size: $fs-64;
  margin-bottom: 20px;
}

h2 {
  font-size: $fs-36;
}

button {
  padding: 10px 20px;
  margin-top: 40px;
  transition: $transition;

  &:hover {
    background-color: darken($primary, 10%);
  }
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 180px;
    font-weight: $fw-700;
  }

  img {
    display: flex;
    margin-top: 50px;
    width: 250px;
    height: 250px;
    margin-left: -10px;
    margin-right: -10px;
  }
}
</style>
