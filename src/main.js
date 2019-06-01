import Vue from 'vue'
import App from './App'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.toastr = toastr

toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-top-right',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '3000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

Vue.filter('castsToString', (casts) => {
  return casts.map(item => {
    console.log(item.name)
    return item.name
  })
})

/* eslint-disable no-new */
new Vue({
  created () {
    toastr.success('启动成功!')
  },
  router,
  render: h => h(App)
}).$mount('#app')
