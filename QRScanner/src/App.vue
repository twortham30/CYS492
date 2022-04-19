<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <header>
   
<div class="mx-auto" style="">
  Centered element
</div>
    <div class="wrapper">
      <HelloWorld  />

     
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';



</style>
