import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'app',
        component: () => import('@/App.vue'),
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/pages/WelcomePage.vue'),
    },
    {
        path: '/room-list',
        name: 'room-list',
        component: () => import('@/pages/RoomListPage.vue'),
    },
    {
        path: '/current-room/:id',
        name: 'current-room',
        component: () => import('@/pages/CurrentRoomPage.vue'),
    },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
    linkActiveClass: 'active', // active class for non-exact links.
    linkExactActiveClass: 'active', // active class for *exact* links.
});

export default router;
