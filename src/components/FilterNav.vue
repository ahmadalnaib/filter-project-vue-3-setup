<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps(['currentFilter']);
const emit = defineEmits(['update-filter']);

const updateFilter = (by) => {
  emit('update-filter', by);
};
</script>

<template>
  <div class="p-4">
    <div class="filter flex space-x-4 justify-center">
      <button
        @click="updateFilter('all')"
        class="px-4 py-2 bg-gray-100 text-dark rounded hover:bg-gray-500"
        :class="{'bg-red-800 text-white': currentFilter === 'all' }"
      >
        View All
      </button>
      <button
        @click="updateFilter('completed')"
        class="px-4 py-2 bg-gray-100 text-dark rounded hover:bg-gray-500"
        :class="{'bg-green-800 text-white': currentFilter === 'completed' }"
      >
        Completed
      </button>
      <button
        @click="updateFilter('ongoing')"
        class="px-4 py-2 bg-gray-100 text-dark rounded hover:bg-gray-500"
        :class="{'bg-orange-800 text-white': currentFilter === 'ongoing' }"
      >
        Ongoing
      </button>
    </div>
  </div>
</template>
