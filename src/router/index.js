import store from '@/store'
import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  scrollBehavior(){
    return {x:0, y:0}
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.isLogged) {
      next({
        name: 'login',
      })
    } else {

      let userPermissions= store.state.auth.abilities;
      if (userPermissions.includes('*'))  {
        next()
      }
      else if(userPermissions.includes(to.name)){
        next()
      }else {
        console.log('sin permiso')
        next('/403')
      }
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.state.auth.isLogged) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach ((to, from) => {
  if(to.path != '/login'){

    if (store.state.auth.user.reinicio_password){
      router.push('/reset')
    }
  }
});

export default router
