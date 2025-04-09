<script setup lang="ts">
const props = defineProps({
  inputVal: String,
  selectedMainHeader: String,
  headersArr: Array,
});

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
