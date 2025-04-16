/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import TableRow from '@/components/TableRow.vue';
const props = defineProps();
//   {mergedposts: Array,
// headersArr: Array,
// sortValue: Object,
// inputVal: String,
// selectedMainHeader: String,}
const emit = defineEmits(['getSortFromParent', 'onClickRow']);
// function handleSelectValue($event: HTMLSelectElement, header: string) {
//   emit('getSortFromParent', {
//     sortBy: $event.target.value,
//     header: header,
//   });
// }
function handleSelectValue(event, header) {
    const target = event.target;
    emit('getSortFromParent', {
        sortBy: target.value,
        header: header,
    });
}
function onClickRow(row) {
    emit('onClickRow', row);
}
function highlightMatch(value) {
    if (!props.inputVal)
        return value;
    console.log('props.inputVal', props.inputVal);
    const searchText = props.inputVal.toLowerCase();
    console.log('searchText', searchText);
    const originalText = value.toString();
    const regex = new RegExp(searchText, 'gi');
    return originalText.replace(regex, (match) => `<span class="colorful">${match}</span>`);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
for (const [header] of __VLS_getVForSourceType((props.headersArr))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "table-header" },
        key: (header),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-options" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "font-bold" },
    });
    (header.charAt(0).toUpperCase() + header.slice(1));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        ...{ onChange: (...[$event]) => {
                __VLS_ctx.handleSelectValue($event, header);
            } },
        ...{ class: "select-wrapper" },
        value: (__VLS_ctx.sortValue.header === header ? __VLS_ctx.sortValue.sortBy : 'default'),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "default",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "lowtohigh",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "hightolow",
    });
}
const __VLS_0 = {}.TransitionGroup;
/** @type {[typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "fade",
    tag: "tbody",
}));
const __VLS_2 = __VLS_1({
    name: "fade",
    tag: "tbody",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
for (const [row] of __VLS_getVForSourceType((props.mergedposts))) {
    /** @type {[typeof TableRow, typeof TableRow, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(TableRow, new TableRow({
        ...{ 'onClick': {} },
        ...{ class: "table-row" },
        key: (row.postId),
    }));
    const __VLS_5 = __VLS_4({
        ...{ 'onClick': {} },
        ...{ class: "table-row" },
        key: (row.postId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    let __VLS_7;
    let __VLS_8;
    let __VLS_9;
    const __VLS_10 = {
        onClick: (...[$event]) => {
            __VLS_ctx.onClickRow(row);
        }
    };
    __VLS_6.slots.default;
    for (const [header] of __VLS_getVForSourceType((props.headersArr))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "table-cell" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.highlightMatch(row[header])) }, null, null);
    }
    var __VLS_6;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-options']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['select-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TableRow: TableRow,
            handleSelectValue: handleSelectValue,
            onClickRow: onClickRow,
            highlightMatch: highlightMatch,
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
