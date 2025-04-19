<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  headersArr: string[];
}>();
const selectedMainHeader = defineModel<string | number>('selectedMainHeader');
const inputVal = defineModel<string>('inputVal');

const isTypeInputNumber = computed(() => ['userId', 'postId'].includes(selectedMainHeader.value));
</script>

<template>
  <!--  <div :class="layout === 'column' ? 'select-input-column' : 'select-input-row'">-->
  <div class="select-input-row">
    <select class="select-wrapperr" v-model="selectedMainHeader">
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
        v-model="inputVal"
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
