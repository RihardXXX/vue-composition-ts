import { createRouter, createWebHistory } from 'vue-router';

// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }

const routes = [
    {
        path: '/',
        component: () => import('../pages/Home.vue'),
    },
    {
        path: '/about',
        component: import('../pages/About.vue'),
    },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

export default router;
