<script setup lang="ts">
const props = defineProps<{
  inputVal: string;
  selectedMainHeader: string;
  headersArr: string[];
  layout?: 'row' | 'column';
}>();
const emit = defineEmits(['update:selectedMainHeader', 'update:inputVal']);
function handleSelect(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:selectedMainHeader', target.value);
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:inputVal', target.value);
}
</script>

<template>
  <!--  <div class="select-input-container">-->
  <div :class="layout === 'column' ? 'select-input-column' : 'select-input-row'">
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
.select-input-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.select-input-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.select-input-column > select,
.select-input-column > div > input {
  margin: 10px;
  width: 80%;
}
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
