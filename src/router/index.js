import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

Vue.use(Router)

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}View.vue`)
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: loadView('Login')
    },
    {
      path: '/',
      component: loadView('Base'),
      meta: { authRequired: true },
      children: [
        {
          path: '',
          name: 'home',
          component: loadView('Room')
        },
        {
          path: '/room/create',
          name: 'room-create',
          component: loadView('RoomForm')
        },
        {
          path: '/room/:id/edit',
          name: 'room-edit',
          component: loadView('RoomForm')
        },
        {
          path: '/room/:id',
          name: 'room',
          component: loadView('Room')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.debug(`Route [${from.path}] => [${to.path}]`)

  if (to.matched.some(record => record.meta.authRequired)) {
    const isAuth = store.getters['auth/isAuthenticated']

    if (!isAuth) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
