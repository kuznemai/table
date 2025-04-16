/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import SelectInput from '@/components/SelectInput.vue';
import { ref, watch } from 'vue';
const props = defineProps({
    forwardedData: Object,
});
const emit = defineEmits(['closeModal']);
function closeModal() {
    emit('closeModal');
}
watch(() => props.forwardedData, (newVal) => {
    if (newVal && newVal.length > 0) {
        console.log('forwardedData получены:', newVal);
    }
}, { immediate: true });
// const selectedMainHeader = ref<string>('');
// const inputVal = ref<string>('');
//
// const isTypeInputNumber = computed<boolean>(() =>
//   ['userId', 'postId'].includes(selectedMainHeader.value)
// );
//
// const filterTableposts = computed<Merged[]>(() => {
//   if (!props.mergedposts || props.mergedposts.length === 0) return [];
//
//   let copymergedposts = [...props.mergedposts];
//   const { sortBy: filterBy, header: selectedHeader } = sort.value;
//
//   if (inputVal.value.length !== 0 && selectedMainHeader.value.length !== 0) {
//     if (isTypeInputNumber.value) {
//       copymergedposts = copymergedposts.filter(
//         (elem) => Number(elem[selectedMainHeader.value]) === Number(inputVal.value)
//       );
//     } else {
//       copymergedposts = copymergedposts.filter((elem) =>
//         elem[selectedMainHeader.value]
//           ?.toString()
//           .toLowerCase()
//           .includes(inputVal.value.toLowerCase())
//       );
//     }
//   }
//
//   return copymergedposts;
// });
const inputVal = ref('');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['close-button-red']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button-red']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "fade",
}));
const __VLS_2 = __VLS_1({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.closeModal) },
    ...{ class: "modal-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-select-input-container" },
});
/** @type {[typeof SelectInput, typeof SelectInput, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(SelectInput, new SelectInput({
    layout: "column",
    inputVal: (__VLS_ctx.inputVal),
}));
const __VLS_5 = __VLS_4({
    layout: "column",
    inputVal: (__VLS_ctx.inputVal),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
(__VLS_ctx.inputVal);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.closeModal) },
    ...{ class: "close-button-red" },
});
var __VLS_7 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.closeModal) },
    ...{ class: "close-button" },
});
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-container']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-select-input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button-red']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
// @ts-ignore
var __VLS_8 = __VLS_7;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SelectInput: SelectInput,
            closeModal: closeModal,
            inputVal: inputVal,
        };
    },
    emits: {},
    props: {
        forwardedData: Object,
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    props: {
        forwardedData: Object,
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
