import store from './store';

import Vue from 'vue';
import Router from 'vue-router';

import Root from '@/views/Root.vue';
import NotFound from '@/views/NotFound.vue';

import Login from '@/views/Login.vue';

import CompanyInfo from '@/views/CompanyInfo.vue';
import CompanySales from '@/views/CompanySales.vue';
import CompanyMaintenance from '@/views/CompanyMaintenance.vue';
import CompanyCalendar from '@/views/CompanyCalendar.vue';
import CompanyUsers from '@/views/CompanyUsers.vue';

import MachineInfo from '@/views/MachineInfo.vue';
import MachineSales from '@/views/MachineSales.vue';

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  const isAuth = _.isEmpty(store.state.company);
  if (isAuth) next();
  else next('/');
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/company',
      name: 'company',
      component: Root,
      redirect: '/company/info',
      children: [
        { path: '/company/sales', component: CompanySales },
        { path: '/company/calendar', component: CompanyCalendar },
        { path: '/company/maintenance', component: CompanyMaintenance },
        { path: '/company/info', component: CompanyInfo },
        { path: '/company/company_users', component: CompanyUsers },
      ],
    },
    {
      path: '/machine',
      name: 'machine',
      component: Root,
      redirect: '/machine/info',
      children: [
        { path: '/machine/info', component: MachineInfo },
        { path: '/machine/sales', component: MachineSales }
      ],
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ],
});
