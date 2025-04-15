<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Avatar from 'vue3-avatar';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
interface TableRowObj {
  id: number;
}
// const props = defineProps({
//   tableRowObj: Object,
// });

const props = defineProps<{
  tableRowObj?: TableRowObj;
}>();
const photos = ref<Photo[]>([]);

const router = useRouter();
const route = useRoute();
async function getPhotos(id: number) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    if (response.ok) {
      const data = await response.json();
      photos.value = data.filter((elem) => elem.albumId === id);
    }
  } catch (err) {
    console.log('Error');
  }
}
onMounted(() => {
  if (props.tableRowObj?.id) {
    getPhotos(props.tableRowObj.id);

    router.push({
      query: {
        ...route.query,
        modalPopup: props.tableRowObj.id.toString(),
      },
    });
  }
});

watch(
  route.query.modalPopup,
  () => {
    getPhotos(Number(route.query.modalPopup));
  },
  { immediate: true }
);
</script>

<template>
  <div class="modal-header">
    <h2>Post details</h2>
    <!--    <h4>PostId : {{ props.postId }}</h4>-->
  </div>
  <div class="modal-body" v-for="photo in photos" :key="photo.id">
    <avatar :name="photo.title || 'Anon'"></avatar>
    <p v-for="(value, key) in photo" :key="key" class="modal-body-elem">
      <strong>{{ key }}:</strong> {{ value }}
    </p>
    <br />
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
