import Vue from 'vue'
import Router from 'vue-router'
import home from "../pages/home";
import vehicle from "../pages/vehicles/vehicle";
import appointment from "../pages/vehicles/appointment";
import report from "../pages/report/report";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
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
        }
      ]
    }
  ]
})
