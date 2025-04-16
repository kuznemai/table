/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import Table from '@/components/Table.vue';
import { computed, ref, watch } from 'vue';
import Pagination from '@/components/Pagination.vue';
import SelectInput from '@/components/SelectInput.vue';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps();
//   {mergedposts: Array,
// headersArr: Array,
// modalData: Array,}
const currentPage = ref(1);
const selectedMainHeader = ref('');
const inputVal = ref('');
const sort = ref({ sortBy: '', header: '' });
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['onClickRow', 'sendPostIdToPosts']);
// / ------------------Filtering------------------------------------------
function getSorting(payload) {
    sort.value = payload;
}
const isTypeInputNumber = computed(() => ['userId', 'postId'].includes(selectedMainHeader.value));
const filterTableposts = computed(() => {
    if (!props.mergedposts || props.mergedposts.length === 0)
        return [];
    let copymergedposts = [...props.mergedposts];
    const { sortBy: filterBy, header: selectedHeader } = sort.value;
    if (inputVal.value.length !== 0 && selectedMainHeader.value.length !== 0) {
        if (isTypeInputNumber.value) {
            copymergedposts = copymergedposts.filter((elem) => Number(elem[selectedMainHeader.value]) === Number(inputVal.value));
        }
        else {
            copymergedposts = copymergedposts.filter((elem) => elem[selectedMainHeader.value]
                ?.toString()
                .toLowerCase()
                .includes(inputVal.value.toLowerCase()));
        }
    }
    if (copymergedposts.length > 0 && typeof copymergedposts[0][selectedHeader] === 'number') {
        if (filterBy === 'lowtohigh') {
            copymergedposts.sort((a, b) => a[selectedHeader] - b[selectedHeader]);
        }
        else if (filterBy === 'hightolow') {
            copymergedposts.sort((a, b) => b[selectedHeader] - a[selectedHeader]);
        }
    }
    else if (copymergedposts.length > 0 && typeof copymergedposts[0][selectedHeader] === 'string') {
        if (filterBy === 'lowtohigh') {
            copymergedposts.sort((a, b) => a[selectedHeader].toLowerCase().localeCompare(b[selectedHeader]));
        }
        else if (filterBy === 'hightolow') {
            copymergedposts.sort((a, b) => b[selectedHeader].toLowerCase().localeCompare(a[selectedHeader]));
        }
    }
    return copymergedposts;
});
const universalPaginatedPosts = ref([]);
function getPaginatedPosts(paginatedPosts) {
    universalPaginatedPosts.value = paginatedPosts;
}
function handlePostId(payload) {
    emit('onClickRow', payload);
}
function getCurrentPage(page) {
    currentPage.value = page;
}
watch(inputVal, (newVal) => {
    router.push({
        query: {
            ...route.query,
            inputVal: newVal,
        },
    });
});
watch(selectedMainHeader, (newVal) => {
    router.push({
        query: {
            ...route.query,
            selectedMainHeader: newVal,
        },
    });
});
watch(sort, (newVal) => {
    router.push({
        query: {
            ...route.query,
            sortBy: newVal.sortBy,
            header: newVal.header,
        },
    });
});
watch(() => route.query, (newQuery) => {
    sort.value.sortBy = newQuery.sortBy?.toString() || 'lowtohigh';
    sort.value.header = newQuery.header?.toString() || 'postId';
    selectedMainHeader.value = newQuery.selectedMainHeader?.toString() || '';
    inputVal.value = newQuery.inputVal?.toString() || '';
}, { immediate: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof SelectInput, typeof SelectInput, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SelectInput, new SelectInput({
    selectedMainHeader: (__VLS_ctx.selectedMainHeader),
    inputVal: (__VLS_ctx.inputVal),
    headersArr: (props.headersArr),
    layout: "row",
}));
const __VLS_1 = __VLS_0({
    selectedMainHeader: (__VLS_ctx.selectedMainHeader),
    inputVal: (__VLS_ctx.inputVal),
    headersArr: (props.headersArr),
    layout: "row",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof Table, typeof Table, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(Table, new Table({
    ...{ 'onGetSortFromParent': {} },
    ...{ 'onOnClickRow': {} },
    mergedposts: (__VLS_ctx.universalPaginatedPosts),
    headersArr: (props.headersArr),
    sortValue: (__VLS_ctx.sort),
    inputVal: (__VLS_ctx.inputVal),
}));
const __VLS_4 = __VLS_3({
    ...{ 'onGetSortFromParent': {} },
    ...{ 'onOnClickRow': {} },
    mergedposts: (__VLS_ctx.universalPaginatedPosts),
    headersArr: (props.headersArr),
    sortValue: (__VLS_ctx.sort),
    inputVal: (__VLS_ctx.inputVal),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onGetSortFromParent: (__VLS_ctx.getSorting)
};
const __VLS_10 = {
    onOnClickRow: (__VLS_ctx.handlePostId)
};
var __VLS_5;
/** @type {[typeof Pagination, typeof Pagination, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(Pagination, new Pagination({
    ...{ 'onSendCurrentPage': {} },
    ...{ 'onPaginatedposts': {} },
    filteredPosts: (__VLS_ctx.filterTableposts),
    currentPage: (__VLS_ctx.currentPage),
}));
const __VLS_12 = __VLS_11({
    ...{ 'onSendCurrentPage': {} },
    ...{ 'onPaginatedposts': {} },
    filteredPosts: (__VLS_ctx.filterTableposts),
    currentPage: (__VLS_ctx.currentPage),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
let __VLS_16;
const __VLS_17 = {
    onSendCurrentPage: (__VLS_ctx.getCurrentPage)
};
const __VLS_18 = {
    onPaginatedposts: (__VLS_ctx.getPaginatedPosts)
};
var __VLS_13;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Table: Table,
            Pagination: Pagination,
            SelectInput: SelectInput,
            currentPage: currentPage,
            selectedMainHeader: selectedMainHeader,
            inputVal: inputVal,
            sort: sort,
            getSorting: getSorting,
            filterTableposts: filterTableposts,
            universalPaginatedPosts: universalPaginatedPosts,
            getPaginatedPosts: getPaginatedPosts,
            handlePostId: handlePostId,
            getCurrentPage: getCurrentPage,
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
