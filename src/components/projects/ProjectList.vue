<script setup>
import { ref, onMounted,computed } from 'vue';
import SingleProject from './SingleProject.vue';
import FilterNav from '../FilterNav.vue';

const projects = ref([]);
const loading = ref(true);
const error = ref(null);
const currentFilter = ref('all');

const fetchProjects = async () => {
  try {
    const response = await fetch('http://localhost:3000/projects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    projects.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProjects);

const filteredProjects = computed(() => {
  if (currentFilter.value === 'all') {
    return projects.value;
  } else if (currentFilter.value === 'completed') {
    return projects.value.filter(project => project.completed);
  } else if (currentFilter.value === 'ongoing') {
    return projects.value.filter(project => !project.completed);
  }
  return projects.value;
});

const handleFilterUpdate = (newFilter) => {
  currentFilter.value = newFilter;
};
</script>

<template>
  <h1 class="text-center mt-10 font-extrabold text-4xl text-gray-800">
    Projects
  </h1>
  <FilterNav  :currentFilter="currentFilter"  @update-filter="handleFilterUpdate"/>
  <main class="container mx-auto p-6" v-if="projects.length">
    <p v-if="loading" class="text-center text-gray-500 mt-6">Loading...</p>
    <p v-if="error" class="text-center text-red-500 mt-6">{{ error }}</p>
    <div
      v-if="!loading && !error"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
    >
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="bg-white rounded-lg overflow-hidden"
      >
        <div class="p-6">
          <SingleProject :project="project" />
        </div>
      </div>
    </div>
  </main>
  <div v-else class="text-center flex justify-center items-center h-screen">
   <span class="pe-3 text-xl"> No Project</span>
    <RouterLink :to="{name:'addProject'}" class="text-white text-bold text-lg bg-black rounded-md p-5">Add Project</RouterLink>
  </div>
</template>
