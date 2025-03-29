<script setup lang="ts">
import Table from '@/components/Table.vue';
import { ref } from 'vue';
interface Props {
  mergedposts: Merged[];
  headersArr: string[];
  sortValue: { sortBy: string; header: string };
}

const props = defineProps<Props>();

const emit = defineEmits(['getSortFromParent']);
function getSorting(event) {
  emit('getSortFromParent', event);
}
</script>

<template>
  <Table
    :mergedposts="mergedposts"
    :headersArr="headersArr"
    @getSortFromParent="getSorting"
    :sort-value="sortValue"
  ></Table>
  <div class="pagination-buttons">
    <button class="pagination-button" @click="previousPage()"><</button>
    <button
      class="pagination-button"
      :class="[currentPage === page ? 'active' : '']"
      v-for="page in amountOfPages"
      :key="page"
      @click="handlePropagationClick(page)"
    >
      {{ page }}
    </button>
    <button class="pagination-button" @click="nextPage()">></button>
  </div>
</template>

<style scoped></style>
