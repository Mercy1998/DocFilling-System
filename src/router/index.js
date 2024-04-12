import Vue from 'vue'
import Router from 'vue-router'

//登录页面
import Login from '../pages/Login'
//选择页面
import DocofPolice from '../pages/Police/DocofPolice'
import DocofInspector from '../pages/Inspector/DocofInspector'
import DocofPoliceOrgan from "../pages/PoliceOrgan/DocofPoliceOrgan";
//DocofPolice
import Police1 from "../pages/Police/Police1.vue";
// DocofInspector
import Inspector1 from "../pages/Inspector/Inspector1.vue";
import Inspector2 from "../pages/Inspector/Inspector2.vue";
import Inspector3 from "../pages/Inspector/Inspector3.vue";
import Inspector4 from "../pages/Inspector/Inspector4.vue";
import Inspector5 from "../pages/Inspector/Inspector5.vue";
import Inspector6 from "../pages/Inspector/Inspector6.vue";
import Inspector7 from "../pages/Inspector/Inspector7.vue";
//DocofPoliceOrgan
import PoliceOrgan1 from "../pages/PoliceOrgan/PoliceOrgan1.vue";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/Login',
      component:Login
    },
    {
      path:'/DocofPolice',
      component:DocofPolice,
      children:[
        {
          path:'/Police1',
          components:Police1
        }
      ]
    },
    {
      path:'/DocofInspector',
      component:DocofInspector,
      children:[
        {
          path:'/Inspector1',
          components:Inspector1
        },
        {
          path:'/Inspector2',
          components:Inspector2
        },
        {
          path:'/Inspector3',
          components:Inspector3
        },
        {
          path:'/Inspector4',
          components:Inspector4
        },,
        {
          path:'/Inspector5',
          components:Inspector5
        },
        {
          path:'/Inspector6',
          components:Inspector6
        },
        {
          path:'/Inspector7',
          components:Inspector7
        }
      ]
    },
    {
      path:'/DocofPoliceOrgan',
      component:DocofPoliceOrgan,
      children:[
        {
          path: '/PoliceOrgan1',
          components: PoliceOrgan1
        }
      ]
    },

    {
      path:'/',
      redirect:'/Login'
    }
  ]
})
