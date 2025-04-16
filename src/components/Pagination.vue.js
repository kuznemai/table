/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps();
//   {
// filteredPosts: Array,
// currentPage: Number,}
const postsPerPage = 25;
const amountOfPages = computed(() => Math.ceil(props.filteredPosts.length / postsPerPage));
const currentPage = ref(1);
const paginatedposts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return props.filteredPosts.slice(start, end);
    console.log('paginatedposts.value', paginatedposts.value);
});
function handlePropagationClick(page) {
    currentPage.value = page;
    emit('sendCurrentPage', page);
    console.log('page', page);
    sendUpdatedPaginatedPosts();
}
function nextPage() {
    if (currentPage.value !== Math.ceil(props.filteredPosts.length / postsPerPage)) {
        currentPage.value++;
        handlePropagationClick(currentPage.value);
    }
}
function previousPage() {
    if (currentPage.value !== 1) {
        currentPage.value--;
        handlePropagationClick(currentPage.value);
    }
}
const emit = defineEmits(['paginatedposts', 'sendCurrentPage']);
function sendUpdatedPaginatedPosts() {
    emit('paginatedposts', paginatedposts.value);
}
watch(() => props.filteredPosts, () => {
    sendUpdatedPaginatedPosts();
});
onMounted(() => {
    sendUpdatedPaginatedPosts();
    const queryPage = Number(route.query.currentPage);
    if (!queryPage || isNaN(queryPage) || queryPage < 1) {
        currentPage.value = 1;
        router.replace({
            query: {
                ...route.query,
                currentPage: '1',
            },
        });
    }
});
const router = useRouter();
const route = useRoute();
watch(currentPage, (newVal) => {
    router.push({
        query: {
            ...route.query,
            currentPage: newVal,
        },
    });
});
watch(() => route.query, (newQuery) => {
    currentPage.value = Number(newQuery.currentPage);
    console.log('Number(newQuery.currentPage)', Number(newQuery.currentPage));
}, { immediate: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pagination-buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.previousPage) },
    ...{ class: "pagination-button" },
});
for (const [page] of __VLS_getVForSourceType((__VLS_ctx.amountOfPages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handlePropagationClick(page);
            } },
        ...{ class: "pagination-button" },
        ...{ class: ([Number(__VLS_ctx.currentPage) === page ? 'active' : '']) },
        key: (page),
    });
    (page);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.nextPage) },
    ...{ class: "pagination-button" },
});
/** @type {__VLS_StyleScopedClasses['pagination-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            amountOfPages: amountOfPages,
            currentPage: currentPage,
            handlePropagationClick: handlePropagationClick,
            nextPage: nextPage,
            previousPage: previousPage,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
