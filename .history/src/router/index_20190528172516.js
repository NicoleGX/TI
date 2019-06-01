import Vue from 'vue'
import Router from 'vue-router'
import TextClassification from '@/views/TextClassification'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TextClassification',
      component: TextClassification
    }
  ]
})
