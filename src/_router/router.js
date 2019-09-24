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
      path: '/atendente',
      name: 'atendente',
      component: () => import('@/views/Atendente.vue')
    },
    {
      path: '/cliente',
      name: 'cliente',
      component: () => import('@/views/Cliente.vue')
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

  store.state.login.loginSuccessful = isLogado == null ? false : true
  if (store.state.login.loginSuccessful)
    store.commit('login/loginSucesso', isLogado)


  //Verifica se o usuario esta logado ou nao
  if (!store.state.login.loginSuccessful)
    if (authRequired && !store.state.login.loginSuccessful)
      return next('/');

  next()

})

export default router