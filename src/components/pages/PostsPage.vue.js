/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { onMounted, ref } from 'vue';
import UniversalTableComponent from '@/components/UniversalTableComponent.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import UniversalModalWindow from '@/components/UniversalModalWindow.vue';
import PostPagePopup from '@/components/popups/PostPagePopup.vue';
const posts = ref([]);
const users = ref([]);
const mergedposts = ref([]);
const headersArr = ref([]);
const isModalOpen = ref(false);
const router = useRouter();
const route = useRoute();
async function getData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (response.ok) {
            const data = await response.json();
            posts.value = data.map(({ id, ...rest }) => ({
                postId: id,
                ...rest,
            }));
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}
async function getUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (response.ok) {
            const data = await response.json();
            users.value = data.map(({ id, ...rest }) => ({
                userId: id,
                ...rest,
            }));
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}
onMounted(async () => {
    await Promise.all([getData(), getUserData()]);
    mergeUsers();
    console.log('route.query.isModalOpen', route.query.isModalOpen);
    if (route.query.isModalOpen === 'true') {
        await getDataFromTableRow(Number(route.query.modalPopup));
    }
});
function mergeUsers() {
    if (posts.value.length === 0 || users.value.length === 0)
        return;
    mergedposts.value = posts.value.map((elem) => {
        const post = users.value.find((user) => elem.userId === user.userId);
        if (post) {
            return { ...elem, username: post.username };
        }
        else {
            return elem;
        }
    });
    headersArr.value = Object.keys(mergedposts.value[0]);
}
// -------------Data request for modal---------------
const tableRowObj = ref({});
async function getDataFromTableRow(payload) {
    await router.push({
        query: {
            ...route.query,
            isModalOpen: 'true', //isModalOpen.value.toString(),
        },
    });
    isModalOpen.value = true;
    tableRowObj.value = payload;
    console.log('ivegotthepayloaaaad', payload);
}
function closeModalWindow() {
    isModalOpen.value = false;
    router.push({
        query: {
            ...route.query,
            isModalOpen: isModalOpen.value.toString(),
        },
    });
}
const forwardedComments = ref([]);
async function forwardSendComments(payload) {
    forwardedComments.value = await payload;
    console.log('forwardedComments.value', forwardedComments.value);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof UniversalTableComponent, typeof UniversalTableComponent, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(UniversalTableComponent, new UniversalTableComponent({
    ...{ 'onOnClickRow': {} },
    ...{ 'onSendPostIdToPosts': {} },
    mergedposts: (__VLS_ctx.mergedposts),
    headersArr: (__VLS_ctx.headersArr),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onOnClickRow': {} },
    ...{ 'onSendPostIdToPosts': {} },
    mergedposts: (__VLS_ctx.mergedposts),
    headersArr: (__VLS_ctx.headersArr),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onOnClickRow: (__VLS_ctx.getDataFromTableRow)
};
const __VLS_7 = {
    onSendPostIdToPosts: (__VLS_ctx.getDataFromTableRow)
};
var __VLS_2;
if (__VLS_ctx.isModalOpen) {
    /** @type {[typeof UniversalModalWindow, typeof UniversalModalWindow, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(UniversalModalWindow, new UniversalModalWindow({
        ...{ 'onCloseModal': {} },
        forwardedData: (__VLS_ctx.forwardedComments),
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onCloseModal': {} },
        forwardedData: (__VLS_ctx.forwardedComments),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_11;
    let __VLS_12;
    let __VLS_13;
    const __VLS_14 = {
        onCloseModal: (__VLS_ctx.closeModalWindow)
    };
    __VLS_10.slots.default;
    /** @type {[typeof PostPagePopup, typeof PostPagePopup, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(PostPagePopup, new PostPagePopup({
        ...{ 'onSendComments': {} },
        tableRowObj: (__VLS_ctx.tableRowObj),
    }));
    const __VLS_16 = __VLS_15({
        ...{ 'onSendComments': {} },
        tableRowObj: (__VLS_ctx.tableRowObj),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    let __VLS_18;
    let __VLS_19;
    let __VLS_20;
    const __VLS_21 = {
        onSendComments: (__VLS_ctx.forwardSendComments)
    };
    var __VLS_17;
    var __VLS_10;
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            UniversalTableComponent: UniversalTableComponent,
            UniversalModalWindow: UniversalModalWindow,
            PostPagePopup: PostPagePopup,
            mergedposts: mergedposts,
            headersArr: headersArr,
            isModalOpen: isModalOpen,
            tableRowObj: tableRowObj,
            getDataFromTableRow: getDataFromTableRow,
            closeModalWindow: closeModalWindow,
            forwardedComments: forwardedComments,
            forwardSendComments: forwardSendComments,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
