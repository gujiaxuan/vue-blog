<script setup>
import Nav from './components/nav';
import { useRouter } from "vue-router";
import { ref } from 'vue';

const router = useRouter();
const active = ref('/home');

const handleActive = (key) => {
  active.value = key;
  router.push(key);
};

</script>

<template>
  <div class="bg-slate-50 w-full h-full flex">
    <Nav :handleActive :active />
    <div class='flex-1 py-12 '>
      <router-view />
    </div>
  </div>

</template>

<style scoped></style>
