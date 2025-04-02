<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  inputVal: String,
  selectedMainHeader: String,
  headersArr: Array,
});
const emit = defineEmits(['update:selectedMainHeader', 'update:inputVal']);
function handleSelect($event: HTMLSelectElement) {
  emit('update:selectedMainHeader', $event.target.value);
}

function handleInput($event: HTMLInputElement) {
  emit('update:inputVal', $event.target.value);
}

const isTypeInputNumber = computed(() => ['userId', 'postId'].includes(props.selectedMainHeader));
</script>

<template>
  <div class="select-input-container">
    <select class="select-wrapperr" @change="handleSelect" :value="selectedMainHeader">
      <option
        v-for="header in props.headersArr"
        :key="header"
        :value="header"
        class="select-option"
      >
        Filter by {{ header }}
      </option>
    </select>
    <div class="">
      <input
        :value="inputVal"
        @input="handleInput"
        class="input-wrapper"
        :type="isTypeInputNumber ? 'number' : 'text'"
        placeholder="Search..."
      />
    </div>
    {{ inputVal }}
  </div>
</template>

<style scoped>
.select-input-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.select-wrapperr,
.input-wrapper {
  width: 200px;
  height: 40px;
  margin-bottom: 20px;
}
</style>
