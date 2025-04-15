<script setup lang="ts">
import TableRow from '@/components/TableRow.vue';
import { ref, computed } from 'vue';

interface Props {
  mergedposts: Merged[];
  headersArr: string[];
  sortValue: { sortBy: string; header: string };
  inputVal: string;
  selectedMainHeader: string;
  postId: number;
}

const props = defineProps<Props>();
//   {mergedposts: Array,
// headersArr: Array,
// sortValue: Object,
// inputVal: String,
// selectedMainHeader: String,}

const emit = defineEmits(['getSortFromParent', 'onClickRow']);

// function handleSelectValue($event: HTMLSelectElement, header: string) {
//   emit('getSortFromParent', {
//     sortBy: $event.target.value,
//     header: header,
//   });
// }
function handleSelectValue(event: Event, header: string) {
  const target = event.target as HTMLSelectElement;
  emit('getSortFromParent', {
    sortBy: target.value,
    header: header,
  });
}

function onClickRow(row: any) {
  emit('onClickRow', row);
}

function highlightMatch(value: string) {
  if (!props.inputVal) return value;
  console.log('props.inputVal', props.inputVal);

  const searchText = props.inputVal.toLowerCase();
  console.log('searchText', searchText);
  const originalText = value.toString();
  const regex = new RegExp(searchText, 'gi');

  return originalText.replace(regex, (match) => `<span class="colorful">${match}</span>`);
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th class="table-header" v-for="header in props.headersArr" :key="header">
          <div class="header-options">
            <span class="font-bold">{{ header.charAt(0).toUpperCase() + header.slice(1) }}</span>
            <select
              @change="handleSelectValue($event, header)"
              class="select-wrapper"
              :value="sortValue.header === header ? sortValue.sortBy : 'default'"
            >
              <option value="default">Не выбрано</option>
              <option value="lowtohigh">По возрастанию</option>
              <option value="hightolow">По убыванию</option>
            </select>
          </div>
        </th>
      </tr>
    </thead>
    <transition-group name="fade" tag="tbody">
      <TableRow
        class="table-row"
        v-for="row in props.mergedposts"
        :key="row.postId"
        @click="onClickRow(row)"
      >
        <template v-for="header in props.headersArr" :key="header">
          <td class="table-cell" v-html="highlightMatch(row[header])"></td>
        </template>
      </TableRow>
    </transition-group>
  </table>
</template>

<style>
.table {
  border: 1px solid black;
  padding: 15px;
  border-collapse: collapse;
}

.table-header {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 10px;
  background-color: #e8e8e8;
}

.table-cell {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 10px;
}

.table-row:hover {
  background-color: #e0e0e0;
  transition: 0.3s;
}

.header-options {
  display: flex;
  flex-direction: column;
}

.select-wrapper {
  max-width: 150px;
  margin: 10px auto 5px auto;
}

.font-bold {
  font-size: 18px;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-move {
  transition: transform 0.5s;
}

.colorful {
  background-color: #ffda60;
}
</style>
