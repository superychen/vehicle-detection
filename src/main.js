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
import BaiduMap from 'vue-baidu-map' //引入百度地图的api
import VueParticles from 'vue-particles' //粒子图
import Cookies from 'js-cookie'　//cookie
import uuid from "./uuid"; //导入uuid的js
import Snackbar from "./components/snackbar/Snackbar";
import fastdfsUrl from "./fastdfsUrl";
import vUploader from 'v-uploader';

axios.defaults.withCredentials = true
axios.create({
  timeout: 50000, //配置请求超时时间
});

// v-uploader plugin global config
const uploaderConfig = {
  // file uploader service url
  uploadFileUrl: 'apis/management/file/upload',
  // file delete service url
  deleteFileUrl: 'apis/management/file/del/file',
  uploadFileObjName: 'file',
  // set the way to show upload message(upload fail message)
  showMessage: (vue, message) => {
    //using v-dialogs to show message
    console.log();
    Snackbar.info('上传文件成功','#42A5F5');
  }
};

Vue.config.productionTip = false
Vue.use(Vuetify);
// install plugin with options
Vue.use(vUploader, uploaderConfig);
Vue.use(CnRegionPicker);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'on08i5pGE4yxEXsR0if8Kx1cUfxNMpNT'
});
Vue.use(VueParticles);

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$echarts = echarts;
Vue.prototype.uuid = uuid;
Vue.prototype.$snackbar = Snackbar;
Vue.prototype.$Cookies = Cookies;
Vue.prototype.$fastdfsUrl = fastdfsUrl;

//Axios请求拦截器，这是对token的拦截
axios.interceptors.request.use(config => {
  let token = Cookies.get('token');
  let username = Cookies.get('username');
  //判断是否存在token，如果存在的话，则每个http header都加上token
  if (token && username) {
    config.headers.Authorization ="Bearer " + token;
    config.headers.username = username;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// axios请求，对所有的http以及自定义状态码进行相应
axios.interceptors.response.use(response => {
  //对自定义请求错误为500的进行处理
  if (response.data.code === 500) {
    Snackbar.info(response.data.data, '#EF5350');
    return response;
  }
  return response;
}, error => {
  if (error.response) {
    if (error.response.status === 401) {
      Snackbar.info('用户身份验证已经过期,请重新登录', '#EF5350');
      setTimeout(() => {
        router.push({path: '/login'});
      }, 1500);
    } else if (error.response.status === 400) {
      Snackbar.info('填写的信息不能为空哟！！', '#EF5350')
    } else {
      Snackbar.info('服务器内部出现异常,请稍后再次尝试', '#EF5350');
    }
  }
  return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  //必须先导入这个，不然无法成功使用vuetify
  vuetify: new Vuetify(),
  template: '<App/>'
}).$mount('#app');
