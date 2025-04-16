/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Avatar from 'vue3-avatar';
const props = defineProps();
const photos = ref([]);
const router = useRouter();
const route = useRoute();
async function getPhotos(id) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (response.ok) {
            const data = await response.json();
            photos.value = data.filter((elem) => elem.albumId === id);
        }
    }
    catch (err) {
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
watch(route.query.modalPopup, () => {
    getPhotos(Number(route.query.modalPopup));
}, { immediate: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['close-button-red']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button-red']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
for (const [photo] of __VLS_getVForSourceType((__VLS_ctx.photos))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-body" },
        key: (photo.id),
    });
    const __VLS_0 = {}.avatar;
    /** @type {[typeof __VLS_components.Avatar, typeof __VLS_components.avatar, typeof __VLS_components.Avatar, typeof __VLS_components.avatar, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        name: (photo.title || 'Anon'),
    }));
    const __VLS_2 = __VLS_1({
        name: (photo.title || 'Anon'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    for (const [value, key] of __VLS_getVForSourceType((photo))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            key: (key),
            ...{ class: "modal-body-elem" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (key);
        (value);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
}
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body-elem']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Avatar: Avatar,
            photos: photos,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
