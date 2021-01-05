import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AddLocation from '../views/AddLocation.vue';
import Admin from '../views/Admin.vue';
import EditLocation from '../views/EditLocation.vue';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/add',
    name: 'Add Location',
    component: AddLocation,
  },
  {
    path: '/edit/:id',
    name: 'Edit Location',
    component: EditLocation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
