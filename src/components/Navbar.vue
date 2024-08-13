<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="bg-indigo-600 text-white shadow-md">
    <div class="container mx-auto flex justify-between items-center p-5">
      <div class="text-2xl font-bold">MyApp</div>
      <nav class="flex space-x-4">
        <RouterLink
          class="hover:text-indigo-300 transition-colors duration-300"
          active-class="bg-white bg-opacity-20 rounded "
          :to="{ name: 'home' }"
        >
          Home
        </RouterLink>
        <RouterLink
          class="hover:text-indigo-300 transition-colors duration-300"
          active-class="bg-white bg-opacity-20 rounded "
          :to="{ name: 'addProject' }"
        >
          Add Project
        </RouterLink>
        <RouterLink
          class="hover:text-indigo-300 transition-colors duration-300"
          active-class="bg-white bg-opacity-20 rounded "
          :to="{ name: 'about' }"
        >
          About
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>