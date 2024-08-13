import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import AddProject from '../views/AddProject.vue';
import EditProject from '../views/EditProject.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projectDetail/:id',
      name: 'projectDetail',
      component: ProjectDetail,
      props: true,
    },
    {
      path: '/addProject',
      name: 'addProject',
      component: AddProject,
    },
    {
      path:'/editProject/:id',
      name:'editProject',
      component: EditProject,
      props: true,


    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
