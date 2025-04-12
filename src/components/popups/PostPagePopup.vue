<script setup lang="ts">
const props = defineProps({
  comments: Array,
});
</script>

<template>
  <div class="modal-header">
    <h2>Post details</h2>
    <!--    <h4>PostId : {{ props.postId }}</h4>-->
  </div>
  <div class="modal-body" v-for="comment in props.comments" :key="comment.postId">
    <avatar :name="comment.email || 'Anon'"></avatar>
    <p v-for="(value, key) in comment" :key="key" class="modal-body-elem">
      <strong>{{ key }}:</strong> {{ value }}
    </p>
    <br />
  </div>
</template>

<style scoped></style>
