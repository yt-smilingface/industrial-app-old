import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
import echarts from 'echarts'
import ECharts from 'vue-echarts'
import EchartsUtils from './echart/'
Vue.component('chart', ECharts);

import { Area } from 'vant';
import axios from "axios";
import {
  Notify
} from 'vant';



// 全局注册Notify
Vue.use(Notify);
Vue.use(EchartsUtils);
Vue.use(Area);

import "lib-flexible"; //cnpm i lib-flexible -S
import "./assets/css/common.css";

Vue.use(Vant);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')