import 'semantic-ui-css/semantic.min.css';
import '@/assets/css/layout.css';
import '@/assets/css/base.css';
import VueSemantic from 'semantic-ui-vue';
import VeeValidate from 'vee-validate';
import lodash from 'lodash';
import moment from 'moment';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

global._ = lodash;
global.moment = moment;

Vue.use(VueSemantic);
Vue.use(VeeValidate, {
  locale: 'ko',
});
Vue.use(VueChartkick, { adapter: Chart });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
