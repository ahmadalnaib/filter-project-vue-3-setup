<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const project = ref({
  name: '',
  description: '',
  tags: [],
  completed: false,
});
const newTag = ref('');
const loading = ref(true);
const error = ref(null);

const fetchProject = async () => {
  try {
    const response = await fetch(`http://localhost:3000/projects/${route.params.id}`);
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

const updateProject = async () => {
  try {
    const response = await fetch(`http://localhost:3000/projects/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project.value),
    });
    if (!response.ok) {
      throw new Error('Failed to update project');
    }
    router.push({ name: 'projectDetail', params: { id: route.params.id } });
  } catch (err) {
    error.value = err.message;
  }
};

const addTag = () => {
  if (newTag.value.trim() !== '') {
    project.value.tags.push(newTag.value.trim());
    newTag.value = '';
  }
};

const removeTag = (index) => {
  project.value.tags.splice(index, 1);
};

onMounted(fetchProject);
</script>

<template>
  <main class="container mx-auto p-6">
    <div v-if="loading" class="text-center text-gray-500 mt-6">Loading...</div>
    <div v-if="error" class="text-center text-red-500 mt-6">{{ error }}</div>
    <div v-if="!loading && !error" class="bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Edit Project</h1>
      <form @submit.prevent="updateProject">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            id="name"
            v-model="project.name"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="project.description"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="completed" class="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="checkbox"
            id="completed"
            v-model="project.completed"
            class="mt-1 block"
          />
        </div>
        <div class="mb-4">
          <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
          <div class="flex items-center mb-2">
            <input
              type="text"
              id="tags"
              v-model="newTag"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              @click="addTag"
              class="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Tag
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in project.tags"
              :key="index"
              class="inline-flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-3 py-1 rounded-full"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                &times;
              </button>
            </span>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
/* Add any additional scoped styles here */
</style>