<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Avatar from 'vue3-avatar';
// import { computed } from 'vue/dist/vue';
import { computed } from 'vue';

const props = defineProps({
  tableRowObj: Object,
});

const emit = defineEmits(['sendComments']);
interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
const comments = ref<Comments[]>([]);
const router = useRouter();
const route = useRoute();
async function getComments(postId: number) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    if (response.ok) {
      const data = await response.json();
      comments.value = data.filter((elem: Comments) => elem.postId === postId);
      emit('sendComments', comments);
      commentsHeaders.value = Object.keys(comments.value[0]);
    }
  } catch (err) {
    console.log('Error');
  }
}

onMounted(() => {
  if (props.tableRowObj?.postId) {
    getComments(props.tableRowObj.postId);

    router.push({
      query: {
        ...route.query,
        modalPopup: props.tableRowObj.postId.toString(),
        //isModalOpen: 'true',
      },
    });
  }
});

watch(
  route.query.modalPopup,
  () => {
    getComments(Number(route.query.modalPopup));
  },
  { immediate: true }
);

const inputValue = ref('');
const isTypeInputNumber = computed<boolean>(() =>
  ['postId', 'id'].includes(selectedCommentsHeader.value)
);
const commentsHeaders = ref([]);
const selectedCommentsHeader = ref<string>('');
const filteredComments = computed(() => {
  let copyOfComments = [...comments.value];
  if (inputValue.value.length !== 0 && selectedCommentsHeader.value.length !== 0) {
    console.log('inputValue.value', inputValue.value);
    console.log('selectedCommentsHeader.value', selectedCommentsHeader.value);
    if (isTypeInputNumber.value) {
      copyOfComments = copyOfComments.filter(
        (elem) => Number(elem[selectedCommentsHeader.value]) === Number(inputValue.value)
      );
    } else {
      copyOfComments = copyOfComments.filter((elem) =>
        elem[selectedCommentsHeader.value]
          .toString()
          .toLowerCase()
          .includes(inputValue.value.toLowerCase())
      );
    }
  }
  return copyOfComments;
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
  <div class="postpage_select_wrapper">
    <select class="postpage_select_wrapper_element" @change="" v-model="selectedCommentsHeader">
      <option v-for="header in commentsHeaders" :key="header" :value="header" class="select-option">
        Filter by {{ header }}
      </option>
    </select>
    <div class="">
      <input
        v-model="inputValue"
        @input=""
        class="postpage_select_wrapper_element"
        :type="isTypeInputNumber ? 'number' : 'text'"
        placeholder="Search comments.."
      />
    </div>
  </div>
  <div class="modal-header">
    <h2>Post details</h2>
    <!--    <h4>PostId : {{ props.postId }}</h4>-->
  </div>
  <div class="modal-body" v-for="comment in filteredComments" :key="comment.postId">
    <avatar :name="comment.email || 'Anon'"></avatar>
    <p v-for="(value, key) in comment" :key="key" class="modal-body-elem">
      <strong>{{ key }}:</strong>
      <span
        v-html="
          selectedCommentsHeader === key && !isTypeInputNumber ? highlightMatch(value) : value
        "
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
}
.postpage_select_wrapper_element {
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
