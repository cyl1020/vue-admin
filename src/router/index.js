import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login.vue');
const Admin = () => import('../views/admin/Admin.vue');

const Home = () => import('../views/home/Home.vue')

const Category = () => import('../views/category/Category.vue')
const Product = () => import('../views/product/Product.vue')
const Detail = () => import('../views/product/Detail.vue')
const AddOrUpdate = () => import('../views/product/AddOrUpdate.vue')

const User = () => import('../views/user/User.vue')
const Role = () => import('../views/role/Role.vue')

const Bar = () => import('../views/charts/Bar.vue')
const Line = () => import('../views/charts/Line.vue')
const Pie = () => import('../views/charts/Pie.vue')

const Order = () => import('../views/order/Order.vue')

Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/admin/home'
  },
  {
    path: '/login',
    name: Login,
    component: Login,
  },
  {
    path: '/admin',
    name: Admin,
    component: Admin,
    children: [
      {
        path: 'home',
        name: Home,
        component: Home,
      },
      {
        path: 'product',
        name: Product,
        component: Product,
      },
      {
        path: '/admin/product/detail',
        name: 'Detail',
        component: Detail,
      },
      {
        path: '/admin/product/addorupdate',
        name: 'AddOrUpdate',
        component: AddOrUpdate,
      },
      {
        path: 'category',
        name: Category,
        component: Category,
      },
      {
        path: 'user',
        name: User,
        component: User,
      },
      {
        path: 'role',
        name: Role,
        component: Role,
      },
      {
        path: 'charts/bar',
        name: Bar,
        component: Bar,
      },
      {
        path: 'charts/line',
        name: Line,
        component: Line,
      },
      {
        path: 'charts/pie',
        name: Pie,
        component: Pie,
      },
      {
        path: 'order',
        name: Order,
        component: Order,
      }
    ]
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router