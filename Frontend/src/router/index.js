import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AgregarCliente from '../components/AgregarCliente.vue'
import AgregarPago from '../components/AgregarPago.vue'
import ClienteId from '../components/ClienteId.vue'
import ListaClientes from '../components/ListaClientes.vue'
import EditarCliente from '../components/EditarCliente.vue'
import EditarPago from '../components/EditarPago.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/AgregarCliente',
    name:'AgregarCliente',
    component:AgregarCliente
  },
  {
    path:'/AgregarPago/:id',
    name:'AgregarPago',
    component:AgregarPago
  },
  {
    path:'/EditarPago/:id',
    name:'EditarPago',
    component:EditarPago
  },
  {
    path:'/EditarCliente/:id',
    name:'EditarCliente',
    component:EditarCliente
  },
  {
    path:'/ListaClientes',
    name:'ListaClientes',
    component:ListaClientes
  },
  {
    path:'/Cliente/:id',
    name:'ClienteId',
    component:ClienteId
  },
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
