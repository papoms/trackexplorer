// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */
/* eslint-disable indent */

import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'

// explicit installation required in module environments
Vue.use(VueFire)

// put this before creating your App instance in main.js
Vue.filter('reverse', function (array) {
  return array.slice().reverse()
})
new Vue({
  el: '#app',
  render: h => h(App)
})
