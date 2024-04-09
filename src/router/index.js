import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import DocofPolice from '@/pages/Police/DocofPolice'
import DocofInspector from '@/pages/Inspector/DocofInspector'
import DocofPoliceOrgan from "@/pages/PoliceOrgan/DocofPoliceOrgan";
import Inspector1 from "../pages/Inspector/Inspector1.vue";
import Police1 from "../pages/Police/Police1.vue";
import Inspector2 from "../pages/Inspector/Inspector2.vue";

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
      path:'/Inspector1',
      component:Inspector1
    },
    {
      path:'/Inspector2',
      component:Inspector2
    },
    {
      path:'/Police1',
      component:Police1
    },
    {
      path:'/',
      redirect:'/Login'
    }
  ]
})
