<script setup>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
</script>

<template>
  <Header />
  <main><slot></slot></main>
  <Footer />
</template>

<style scoped lang="scss"></style>
