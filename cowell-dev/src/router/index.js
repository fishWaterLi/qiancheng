import Vue from 'vue'
import Router from 'vue-router'
import corpus from '../pages/corpus'
import taskManagement from '../pages/taskManagement'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    // mode: 'history',    //该模式下没有 # 前缀
    routes: [
      {
        path: '/',
        component: corpus
      },
      {
        path: '/corpus',
        name: 'corpus',
        component: corpus
      },
      {
        path: '/taskManagement',
        name: 'taskManagement',
        component: taskManagement,
      },
     
    ]
  })

