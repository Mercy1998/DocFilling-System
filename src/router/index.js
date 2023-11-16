import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import Entry from '@/pages/Entry'
import Admin from '@/pages/Admin'
import Setting from '@/pages/Setting'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/login',
      component:Login
    },
    {
      path:'/Entry',
      component:Entry
    },
    {
      path:'/Admin',
      component:Admin
    },
    {
      path:'/Setting',
      component:Setting
    },
    {
      path:'/',
      redirect:'/login'
    }
  ]
})
