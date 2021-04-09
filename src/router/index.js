import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Macroeconomics from '../views/Macroeconomics'
import IndustrialEconomy from '../views/IndustrialEconomy.vue'
import KeyEnterprise from '../views/KeyEnterprise'
import RegisterAccount from '../views/RegisterAccount.vue'
import FirmHome from '../views/FirmHome.vue';
import FillForm from '../views/FillForm.vue';
import FillDetails from '../views/FillDetails.vue';
import InteractiveMessage from '../views/InteractiveMessage.vue';
import newsList from '../views/newsList.vue';
import menagement from '../views/menagement.vue';
import director from '../views/director.vue';

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
  path: '/',
  name: 'Login',
  component: Login
}, {
  path: '/home',
  name: 'Home',
  component: Home,
  beforeEnter: (to, from, next) => {
    if (localStorage.getItem('userInfo')) {
      next();
    } else {
      next({
        path: '/'
      });
    }
  }
}, {
  path: '/firmHome',
  name: 'FirmHome',
  component: FirmHome,
  beforeEnter: (to, from, next) => {
    if (localStorage.getItem('userInfo')) {
      next();
    } else {
      next({
        path: '/'
      });
    }
  }
}, {
  path: '/macroeconomics',
  name: 'Macroeconomics',
  component: Macroeconomics
}, {
  path: '/industrialEconomy',
  name: 'IndustrialEconomy',
  component: IndustrialEconomy
}, {
  path: '/keyEnterprise',
  name: 'KeyEnterprise',
  component: KeyEnterprise
}, {
  path: '/registerAccount',
  name: 'RegisterAccount',
  component: RegisterAccount
}, {
  path: '/fillForm',
  name: 'FillForm',
  component: FillForm
}, {
  path: '/fillDetails',
  name: 'FillDetails',
  component: FillDetails
}, {
  path: '/interactiveMessage',
  name: 'InteractiveMessage',
  component: InteractiveMessage
}, {
  path: '/newsList',
  name: 'newsList',
  component: newsList
}, {
  path: '/menagement',
  name: 'menagement',
  component: menagement
}, {
  path: '/director',
  name: 'director',
  component: director
}]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router