<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Avatar from 'vue3-avatar';
// import { computed } from 'vue/dist/vue';
import { computed } from 'vue';
import SelectInput from '@/components/SelectInput.vue';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const props = defineProps({
  id: Number,
});

const photos = ref<Photo[]>([]);

async function getPhotos(id: number) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    if (response.ok) {
      const data = await response.json();
      photos.value = data.filter((elem) => elem.albumId === id);
      photosHeaders.value = Object.keys(photos.value[0]);
    }
  } catch (err) {
    console.log('Error');
  }
}
onMounted(() => {
  if (props.id) {
    console.log('props.id', props.id);
    getPhotos(props.id);
  }
});

const inputValue = ref('');
const isTypeInputNumber = computed<boolean>(() =>
  ['albumId', 'id'].includes(selectedPhotosHeader.value)
);
const photosHeaders = ref([]);
const selectedPhotosHeader = ref<string>('');

const filteredPhotos = computed(() => {
  let copyOfPhotos = [...photos.value];
  if (inputValue.value.length !== 0 && selectedPhotosHeader.value.length !== 0) {
    console.log('inputValue.value', inputValue.value);
    console.log('selectedCommentsHeader.value', selectedPhotosHeader.value);
    if (isTypeInputNumber.value) {
      copyOfPhotos = copyOfPhotos.filter(
        (elem) => Number(elem[selectedPhotosHeader.value]) === Number(inputValue.value)
      );
    } else {
      copyOfPhotos = copyOfPhotos.filter((elem) =>
        elem[selectedPhotosHeader.value]
          .toString()
          .toLowerCase()
          .includes(inputValue.value.toLowerCase())
      );
    }
  }
  return copyOfPhotos;
});
function highlightMatch(value: string) {
  const searchText = inputValue.value.toLowerCase();
  console.log('searchText', searchText);
  const originalText = value.toString();
  const regex = new RegExp(searchText, 'gi');

  return originalText.replace(regex, (match) => `<span class="colorful">${match}</span>`);
}
</script>

<template>
  <SelectInput
    :headers-arr="photosHeaders"
    v-model:selected-main-header="selectedPhotosHeader"
    v-model:input-val="inputValue"
  ></SelectInput>

  <div class="modal-header">
    <h2>Post details</h2>
    <!--    <h4>PostId : {{ props.postId }}</h4>-->
  </div>
  <div class="modal-body" v-for="photo in filteredPhotos" :key="photo.id">
    <avatar :name="photo.title || 'Anon'"></avatar>
    <p v-for="(value, key) in photo" :key="key" class="modal-body-elem">
      <strong>{{ key }}:</strong>
      <span
        v-html="selectedPhotosHeader === key && !isTypeInputNumber ? highlightMatch(value) : value"
      ></span>
    </p>
    <br />
  </div>
</template>

<style scoped>
.modal-body {
  border: 1px solid #6b6b6b;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
}

.modal-body-elem {
  word-break: break-word;
  overflow-wrap: anywhere;
  margin-bottom: 5px;
  border-bottom: 1px solid #8c8c8c;
  border-bottom: 1px solid #8c8c8c;
}
.albumspage_select_wrapper_element {
  width: 90%;
  height: 30px;
  gap: 10px;
  margin: 10px;
}
.colorful {
  background-color: yellow;
  font-weight: bold;
}
</style>
