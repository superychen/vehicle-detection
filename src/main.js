// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Vuetify from 'vuetify'
import echarts from 'echarts'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import CnRegionPicker from 'cn-region-picker' //引入

axios.defaults.withCredentials = true
axios.create({
  timeout: 50000, //配置请求超时时间
});

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(CnRegionPicker)

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  //必须先导入这个，不然无法成功使用vuetify
  vuetify: new Vuetify(),
  template: '<App/>'
}).$mount('#app');
