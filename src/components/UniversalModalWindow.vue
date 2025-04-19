<script setup lang="ts">
import SelectInput from '@/components/SelectInput.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  id: Number,
});

const emit = defineEmits(['closeModal']);
const router = useRouter();
const route = useRoute();

function closeModal() {
  emit('closeModal');
}
onMounted(() => {
  console.log('props.idtesttest', props.id);
  router.push({
    query: {
      ...route.query,
      modalPopup: props.id,
    },
  });
});

onUnmounted(() => {
  router.replace({
    modalPopup: '',
  });
});
</script>

<template>
  <div>
    <transition name="fade">
      <div class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-select-input-container"></div>
          <button @click="closeModal" class="close-button-red"></button>
          <slot></slot>
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
  position: relative; /* чтобы кнопка позиционировалась внутри */
  width: 400px;
  max-height: 80vh;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-y: auto;
}

/* Кнопка-крестик в правом верхнем углу */
.close-button-red {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #ff5c5c;
  cursor: pointer;
  transition: color 0.2s;
}

.close-button-red:hover {
  color: #ff1a1a;
}

.close-button-red::before {
  content: '✕';
}

.close-button {
  background-color: #3e8a49;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
}

.select-input-container {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px; /* расстояние между селектом и инпутом */
}
</style>
