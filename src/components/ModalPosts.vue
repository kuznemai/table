<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  isModalOpen: Boolean,
  postId: Number,
});
const emit = defineEmits(['update:isModalOpen']);
function closeModal() {
  emit('update:isModalOpen', false);
}
const comments = ref([]);
async function getComments() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    if (response.ok) {
      const data = await response.json();
      console.log('hghghghghghgh', data);
      comments.value = data.filter((elem) => elem.postId === props.postId);
    }
  } catch (err) {
    console.log('Error');
  }
}
onMounted(() => getComments());
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <h2>Post details</h2>
            <h4>PostId : {{ props.postId }}</h4>
          </div>
          <div class="modal-body">
            <p v-for="comment in comments" :key="comment.id" class="modal-body-elem">
              Comment from {{ comment.email }} : {{ comment.name }}
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
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
}

.close-button {
  background-color: #3e8a49;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
}
.modal-body-elem {
  margin-bottom: 5px;
  border-bottom: 1px solid #8c8c8c;
}
</style>
