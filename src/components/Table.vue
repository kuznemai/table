<script setup lang="ts">
import TableRow from '@/components/TableRow.vue';
import { ref, computed } from 'vue';
import ModalPosts from '@/components/ModalPosts.vue';
import Pagination from '@/App.vue';

interface Props {
  mergedposts: Merged[];
  headersArr: string[];
  // sortValue: { sortBy: string; header: string };
  inputVal: string;
  selectedMainHeader: string;
}

const props = defineProps({
  mergedposts: Array,
  headersArr: Array,
  // sortValue: { sortBy: string; header: string };
  inputVal: String,
  selectedMainHeader: String,
});
const sort = ref({ sortBy: 'lowtohigh', header: 'postId' });

// const emit = defineEmits(['getSortFromParent']);
//
// function handleSelectValue($event: HTMLSelectElement, header: string) {
//   emit('getSortFromParent', {
//     sortBy: $event.target.value,
//     header: header,
//   });
// }
// ------------------Filtering------------------------------------------

// function getSorting(payload: { sortBy: string; header: string }) {
//   console.log('payload', payload);
//   sort.value = payload;
//   console.log('Cортировка', sort.value);
// }
function handleSelectValue(event: Event, header: string) {
  const target = event.target as HTMLSelectElement;
  sort.value = {
    sortBy: target.value,
    header: header,
  };
}
const isTypeInputNumber = computed(() => ['userId', 'postId'].includes(props.selectedMainHeader));

const filterTableposts = computed(() => {
  let copymergedposts = [...props.mergedposts];

  const { sortBy: filterBy, header: selectedHeader } = sort.value;

  if (props.inputVal.length !== 0 && props.selectedMainHeader.length !== 0) {
    if (isTypeInputNumber.value) {
      console.log('isTypeInputNumber.value', isTypeInputNumber.value);
      copymergedposts = copymergedposts.filter(
        (elem) => Number(elem[props.selectedMainHeader]) === Number(props.inputVal)
      );
    } else {
      copymergedposts = copymergedposts.filter((elem) =>
        elem[props.selectedMainHeader]
          ?.toString()
          .toLowerCase()
          .includes(props.inputVal.toLowerCase())
      );
    }
  }

  if (copymergedposts.length > 0 && typeof copymergedposts[0][selectedHeader] === 'number') {
    if (filterBy === 'lowtohigh') {
      copymergedposts.sort((a, b) => a[selectedHeader] - b[selectedHeader]);
    } else if (filterBy === 'hightolow') {
      copymergedposts.sort((a, b) => b[selectedHeader] - a[selectedHeader]);
    }
  } else if (copymergedposts.length > 0 && typeof copymergedposts[0][selectedHeader] === 'string') {
    if (filterBy === 'lowtohigh') {
      copymergedposts.sort((a, b) =>
        a[selectedHeader].toLowerCase().localeCompare(b[selectedHeader])
      );
    } else if (filterBy === 'hightolow') {
      copymergedposts.sort((a, b) =>
        b[selectedHeader].toLowerCase().localeCompare(a[selectedHeader])
      );
    }
  }
  emit('filteredposts', copymergedposts);
  return copymergedposts;
});

const isModalOpen = ref(false);
const postId = ref();

function openPost(id) {
  isModalOpen.value = true;
  postId.value = id;
}

function highlightMatch(value) {
  if (!props.inputVal) return value;

  const searchText = props.inputVal.toLowerCase();
  const originalText = value.toString();
  const regex = new RegExp(searchText, 'gi');

  return originalText.replace(regex, (match) => `<span class="colorful">${match}</span>`);
}

const emit = defineEmits(['filteredposts']);
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
              :value="sort.header === header ? sort.sortBy : 'default'"
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
      <TableRow class="table-row" v-for="post in filterTableposts" :key="post.postId">
        <template v-for="header in props.headersArr" :key="header">
          <td
            @click="openPost(post.postId)"
            class="table-cell"
            v-html="highlightMatch(post[header])"
          ></td>
        </template>
      </TableRow>
    </transition-group>
    <!--    </tbody>-->
  </table>
  <ModalPosts v-if="isModalOpen" v-model:isModalOpen="isModalOpen" :post-id="postId"></ModalPosts>
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
  background-color: #ffffbe;
  font-weight: bold;
}
</style>
