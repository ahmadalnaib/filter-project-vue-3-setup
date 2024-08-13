<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const project = ref(null);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

const fetchProject = async () => {
  try {
    const response = await fetch(`http://localhost:3000/projects/${props.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project details');
    }
    const data = await response.json();
    project.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const deleteProject = async () => {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      const response = await fetch(
        `http://localhost:3000/projects/${props.id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      router.push({ name: 'home' });
    } catch (err) {
      error.value = err.message;
    }
  }
};

onMounted(() => {
  fetchProject();
});
</script>

<template>
  <main class="container mx-auto p-6">
    <div v-if="loading" class="text-center text-gray-500 mt-6">Loading...</div>
    <div v-if="error" class="text-center text-red-500 mt-6">{{ error }}</div>
    <div v-if="!loading && !error" class="bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ project.name }}</h1>
      <p class="text-gray-700 mb-6">{{ project.description }}</p>
      <div v-if="project.tags && project.tags.length" class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Tags</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-3 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="flex justify-end">
        <RouterLink :to="{name:'editProject',params:{id:project.id}}"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-5"
        >
          Edit Project
        </RouterLink>
        <button
          @click="deleteProject"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Delete Project
        </button>
      </div>
    </div>
  </main>
</template>
