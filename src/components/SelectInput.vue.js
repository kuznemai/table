/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
const props = defineProps();
const emit = defineEmits(['update:selectedMainHeader', 'update:inputVal']);
function handleSelect(event) {
    const target = event.target;
    emit('update:selectedMainHeader', target.value);
}
function handleInput(event) {
    const target = event.target;
    emit('update:inputVal', target.value);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['select-input-column']} */ ;
/** @type {__VLS_StyleScopedClasses['select-input-column']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.layout === 'column' ? 'select-input-column' : 'select-input-row') },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.handleSelect) },
    ...{ class: "select-wrapperr" },
    value: (__VLS_ctx.selectedMainHeader),
});
for (const [header] of __VLS_getVForSourceType((props.headersArr))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (header),
        value: (header),
        ...{ class: "select-option" },
    });
    (header);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.handleInput) },
    value: (__VLS_ctx.inputVal),
    ...{ class: "input-wrapper" },
    type: (__VLS_ctx.isTypeInputNumber ? 'number' : 'text'),
    placeholder: "Search...",
});
(__VLS_ctx.inputVal);
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['select-wrapperr']} */ ;
/** @type {__VLS_StyleScopedClasses['select-option']} */ ;
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            handleSelect: handleSelect,
            handleInput: handleInput,
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
