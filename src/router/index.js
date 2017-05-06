import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Print from '@/views/Print'
import Admin from '@/views/Admin'
import Login from '@/views/Login'
import Check from '@/views/Check'
import Printer from '@/views/Printer'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/print',
    name: 'Print',
    component: Print
  }, {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/check',
    name: 'Check',
    component: Check
  }, {
    path: '/printer',
    name: 'Printer',
    component: Printer
  }]
})
