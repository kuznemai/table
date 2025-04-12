<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Avatar from 'vue3-avatar';

// const props = defineProps({
//   dataForRender: Array,
//   isModalOpen: Boolean,
//   postId: Number,
// });
const comments = ref([]);

const emit = defineEmits(['closeModal']);

// watch(props.dataForRender, () => {
//   if (props.dataForRender?.length !== 0) {
//     comments.value = props.dataForRender;
//   }
// });
function closeModal() {
  emit('closeModal');
}
</script>

<template>
  <div>
    <transition name="fade">
      <div class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <button @click="closeModal" class="close-button-red"></button>
          <!--          <div class="modal-header">-->
          <!--            <h2>Post details</h2>-->
          <!--            <h4>PostId : {{ props.postId }}</h4>-->
          <!--          </div>-->
          <!--          <div class="modal-body" v-for="data in props.dataForRender" :key="data.postId">-->
          <!--            <avatar :name="data.email || 'Anon'"></avatar>-->
          <!--            <p v-for="(value, key) in data" :key="key" class="modal-body-elem">-->
          <!--              <strong>{{ key }}:</strong> {{ value }}-->
          <!--            </p>-->
          <!--            <br />-->
          <!--          </div>-->
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
