/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { onMounted, ref } from 'vue';
import UniversalTableComponent from '@/components/UniversalTableComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import UniversalModalWindow from '@/components/UniversalModalWindow.vue';
import AlbumsPagePopup from '@/components/popups/AlbumsPagePopup.vue';
const router = useRouter();
const route = useRoute();
const isModalOpen = ref(false);
const albumsArr = ref([]);
const headersArr = ref([]);
async function getAlbums() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (response.ok) {
            // const data = await response.json();
            albumsArr.value = await response.json();
            console.log('albumsArr.value', albumsArr.value);
        }
        headersArr.value = Object.values(Object.keys(albumsArr.value[0]));
        console.log('headersArr.value', headersArr.value);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
onMounted(async () => {
    await getAlbums();
    if (route.query.isModalOpen === 'true') {
        await getDataFromTableRow(Number(route.query.modalPopup));
    }
});
// -------------Data request for modal---------------
// const photos = ref([]);
const tableRowObj = ref({});
async function getDataFromTableRow(payload) {
    await router.push({
        query: {
            ...route.query,
            isModalOpen: 'true',
        },
    });
    tableRowObj.value = payload;
    console.log('albumspagepayload', payload);
    isModalOpen.value = true;
}
function closeModalWindow() {
    isModalOpen.value = false;
    router.push({
        query: {
            ...route.query,
            isModalOpen: 'false',
        },
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof UniversalTableComponent, typeof UniversalTableComponent, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(UniversalTableComponent, new UniversalTableComponent({
    ...{ 'onOnClickRow': {} },
    mergedposts: (__VLS_ctx.albumsArr),
    headersArr: (__VLS_ctx.headersArr),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onOnClickRow': {} },
    mergedposts: (__VLS_ctx.albumsArr),
    headersArr: (__VLS_ctx.headersArr),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onOnClickRow: (__VLS_ctx.getDataFromTableRow)
};
var __VLS_2;
if (__VLS_ctx.isModalOpen) {
    /** @type {[typeof UniversalModalWindow, typeof UniversalModalWindow, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(UniversalModalWindow, new UniversalModalWindow({
        ...{ 'onCloseModal': {} },
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onCloseModal': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_10;
    let __VLS_11;
    let __VLS_12;
    const __VLS_13 = {
        onCloseModal: (__VLS_ctx.closeModalWindow)
    };
    __VLS_9.slots.default;
    /** @type {[typeof AlbumsPagePopup, typeof AlbumsPagePopup, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(AlbumsPagePopup, new AlbumsPagePopup({
        tableRowObj: (__VLS_ctx.tableRowObj),
    }));
    const __VLS_15 = __VLS_14({
        tableRowObj: (__VLS_ctx.tableRowObj),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    var __VLS_9;
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            UniversalTableComponent: UniversalTableComponent,
            UniversalModalWindow: UniversalModalWindow,
            AlbumsPagePopup: AlbumsPagePopup,
            isModalOpen: isModalOpen,
            albumsArr: albumsArr,
            headersArr: headersArr,
            tableRowObj: tableRowObj,
            getDataFromTableRow: getDataFromTableRow,
            closeModalWindow: closeModalWindow,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
