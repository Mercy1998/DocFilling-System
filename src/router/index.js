import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import entry from '@/pages/entry'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/login',
      component:Login
    },
    {
      path:'/entry',
      component:entry
    },
    {
      path:'/',
      redirect:'/login'
    }
  ]
})
