<script setup lang="ts">
import Table from '@/components/Table.vue';
import { ref } from 'vue';
interface Props {
  mergedposts: Merged[];
  headersArr: string[];
  sortValue: { sortBy: string; header: string };
  page: number;
  amountOfPages: number;
  currentPage: number;
}

const props = defineProps<Props>();

const emit = defineEmits([
  'getSortFromParent',
  'sendPreviousEmits',
  'sendNextEmits',
  'emitPropagation',
]);
function getSorting(event) {
  emit('getSortFromParent', event);
}
function sendPreviousEmits(event) {
  emit('sendPreviousEmits', event);
}
function sendNextEmits(event) {
  emit('sendNextEmits', event);
}
function emitPropagation(page) {
  emit('emitPropagation', page);
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
    <button class="pagination-button" @click="sendPreviousEmits()"><</button>
    <button
      class="pagination-button"
      :class="[currentPage === page ? 'active' : '']"
      v-for="page in amountOfPages"
      :key="page"
      @click="emitPropagation(page)"
    >
      {{ page }}
    </button>
    <button class="pagination-button" @click="sendNextEmits()">></button>
  </div>
</template>

<style scoped>
.pagination-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 30px;
}

.pagination-button {
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
}

.pagination-button:hover {
  background-color: #cccccc;
  transition: 0.3s;
}

.active {
  background-color: #8c8c8c;
}
</style>
