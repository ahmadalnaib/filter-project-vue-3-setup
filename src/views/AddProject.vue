<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const description = ref('');
const tags = ref([]);
const completed = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  const project = {
    name: name.value,
    description: description.value,
    tags: tags.value.split(',').map((tag) => tag.trim()), // Assuming tags are comma-separated
    completed: completed.value,
  };

  try {
    const response = await fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    // Navigate to the project list or another route
    router.push('/home');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Add Project</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="projectName" class="block text-sm font-medium text-gray-700"
          >Project Name</label
        >
        <input
          type="text"
          id="projectName"
          v-model="name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          for="projectDescription"
          class="block text-sm font-medium text-gray-700"
          >Project Description</label
        >
        <textarea
          id="projectDescription"
          v-model="description"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label for="tags" class="block text-sm font-medium text-gray-700"
          >Tags</label
        >
        <input
          type="text"
          id="tags"
          v-model="tags"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <button
        type="submit"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  </div>
</template>
