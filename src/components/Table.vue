<script setup lang="ts">
import TableRow from '@/components/TableRow.vue';
interface Props {
  mergedposts: Merged[];
  headersArr: string[];
  sortValue: { sortBy: string; header: string };
}

const props = defineProps<Props>();

const emit = defineEmits(['getSortFromParent']);

function handleSelectValue($event: HTMLSelectElement, header: string) {
  emit('getSortFromParent', {
    sortBy: $event.target.value,
    header: header,
  });
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th class="table-header" v-for="(header, index) in props.headersArr" :key="header">
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
    <!--    <tbody>-->
    <transition-group name="fade" tag="tbody">
      <TableRow v-for="post in props.mergedposts" :key="post.id">
        <template v-for="header in props.headersArr" :key="header">
          <td class="table-cell">{{ post[header] }}</td>
        </template>
      </TableRow>
    </transition-group>
    <!--    </tbody>-->
  </table>
</template>

<style scoped>
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
</style>
