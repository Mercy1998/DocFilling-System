import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import DocofPolice from '@/pages/Police/DocofPolice'
import DocofInspector from '@/pages/Inspector/DocofInspector'
import DocofPoliceOrgan from "@/pages/PoliceOrgan/DocofPoliceOrgan";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/Login',
      component:Login
    },
    {
      path:'/DocofPoliceOrgan',
      component:DocofPoliceOrgan
    },
    {
      path:'/DocofPolice',
      component:DocofPolice,
      // children:[
      //   {
      //     path:'/doc1',
      //     components:Police
      //   }
      // ]
    },
    {
      path:'/DocofInspector',
      component:DocofInspector
    },
    {
      path:'/',
      redirect:'/Login'
    }
  ]
})
