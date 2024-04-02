import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import Police from '@/pages/Police'
import Inspector from '@/pages/Inspector'
import PoliceOrgan from "@/pages/PoliceOrgan";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/Login',
      component:Login
    },
    {
      path:'/PoliceOrgan',
      component:PoliceOrgan
    },
    {
      path:'/Police',
      component:Police,
      children:[
        {
          path:'',
          components:Police
        }
      ]
    },
    {
      path:'/Inspector',
      component:Inspector
    },
    {
      path:'/',
      redirect:'/Login'
    }
  ]
})
