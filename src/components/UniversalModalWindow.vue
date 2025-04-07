<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Avatar from 'vue3-avatar';

const props = defineProps({
  dataForRender: Array,
  isModalOpen: Boolean,
  postId: Number,
});

const emit = defineEmits(['update:isModalOpen']);

function closeModal() {
  emit('update:isModalOpen', false);
}

onMounted(() => console.log('props.dataForRender', props.dataForRender));
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="props.isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <h2>Post details</h2>
            <h4>PostId : {{ props.postId }}</h4>
          </div>
          <div class="modal-body" v-for="data in props.dataForRender" :key="data.postId">
            <avatar :name="data.email || 'Anon'"></avatar>
            <p v-for="(value, key) in data" :key="key" class="modal-body-elem">
              <strong>{{ key }}:</strong> {{ value }}
            </p>
            <br />
          </div>
          <div class="modal-footer">
            <button @click="closeModal" class="close-button">Закрыть</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 400px;
  max-height: 80vh;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-y: auto;
}

.close-button {
  background-color: #3e8a49;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
}

.modal-body {
  border: 1px solid #6b6b6b;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
}

.modal-body-elem {
  margin-bottom: 5px;
  border-bottom: 1px solid #8c8c8c;
}
</style>
