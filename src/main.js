import Vue from 'vue'

import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {},
  directives: {
    Ripple,
  },
})

const opts = {}
const vuetify = new Vuetify(opts)
import App from './App.vue'

Vue.config.productionTip = false
new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
