<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>


<template>
  <main>
    <div class="bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
      <RouterLink :to="{ name: 'projectDetail', params: { id: project.id } }" class="text-2xl font-semibold text-indigo-600 hover:underline">
        {{ project.name }}
      </RouterLink>
      <p class="mt-4 text-gray-700">{{ project.description }}</p>
    </div>
  </main>
</template>