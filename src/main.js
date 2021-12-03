import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { FormFilePlugin } from 'bootstrap-vue'
import { ButtonPlugin } from 'bootstrap-vue'
import { AlertPlugin } from 'bootstrap-vue'
import { FormTextareaPlugin } from 'bootstrap-vue'





// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ButtonPlugin)
Vue.use(FormFilePlugin)
Vue.use(AlertPlugin)
Vue.use(FormTextareaPlugin)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

