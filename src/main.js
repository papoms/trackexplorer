// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */
/* eslint-disable indent */

import Vue from 'vue'
import App from './App'

Vue.config.silent = true
console.log = function () {}

new Vue({
  el: '#app',
  render: h => h(App)
})
