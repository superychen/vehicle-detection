import Vue from 'vue'
import Router from 'vue-router'
import home from "../pages/home";
import vehicle from "../pages/vehicles/vehicle";
import appointment from "../pages/vehicles/appointment";
import report from "../pages/report/report";
import login from "../pages/login/login";
import userinfo from "../pages/user/userinfo";

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
};

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'otherRouter',
      redirect: '/login'
    },
    {
      path: '/login',
      name: login,
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/vehicle',
      children:[
        {
          path: '/vehicle',
          name: 'vehicle',
          component: vehicle,
        },
        {
          path: '/appointment',
          name: appointment,
          component: appointment,
        },
        {
          path: '/report',
          name: report,
          component: report,
        },
        {
          path: '/userinfo',
          name: userinfo,
          component: userinfo,
        },
      ]
    }
  ]
})
