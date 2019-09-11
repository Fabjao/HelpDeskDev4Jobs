import Vue from 'vue'
import Router from 'vue-router'
import store from '@/_store/store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/Cadastro.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: () => import('@/views/Tutorial.vue')
    },
    {
      path: '/duvida',
      name: 'duvida',
      component: () => import('@/views/Duvida.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {

  /*Configura as rotas que nao precisam de autorizacao*/
  const publicPages = ['/', '/cadastro'];
  //Verifica se a rota que o usuario quer precisa ou não de autorizacao
  const authRequired = !publicPages.includes(to.path);

  //Verificar se usuario esta logado no sistema
  const isLogado = JSON.parse(localStorage.getItem('dev4jobsForum'))

  store.state.login.loginSuccessful= isLogado == null ? false : true

  //Verifica se o usuario esta logado ou nao
  if (authRequired && !store.state.login.loginSuccessful)
    return next('/');

  next()

})

export default router