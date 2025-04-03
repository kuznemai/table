<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  isOpenModalAlbum: Boolean,
  albumId: Number,
});
console.log('albumId.value', props.albumId);
const emit = defineEmits(['update:isOpenModalAlbum']);
function closeModalAlbum() {
  emit('update:isOpenModalAlbum', false);
}
const photos = ref([]);
async function getComments() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    if (response.ok) {
      const data = await response.json();
      console.log('ttttttttt', data);
      photos.value = data.filter((elem) => elem.albumId === props.albumId);
      console.log('photosvalue', photos.value);
    }
  } catch (err) {
    console.log('Error');
  }
}
watch(() => props.albumId, getComments);
onMounted(getComments);
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="isOpenModalAlbum" class="modal-overlay" @click.self="closeModalAlbum">
        <div class="modal-container">
          <div class="modal-header">
            <h2>Post details</h2>
            <h4>PostId :</h4>
          </div>
          <div class="modal-body">
            <p v-for="photo in photos" :key="photo.id" class="modal-body-elem">
              Photo ID : {{ photo.id }}, Photo title: {{ photo.title }}, Photo URL: {{ photo.url }}
            </p>
            <br />
          </div>
          <div class="modal-footer">
            <button @click="closeModalAlbum" class="close-button">Закрыть</button>
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
  max-height: 80vh; /* Ограничение высоты */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-y: auto; /* Прокрутка при переполнении */
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
