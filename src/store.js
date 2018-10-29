import api from './api';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    company: {}
  },
  getters: {
    company(state) {
      return state.company.machines
    }
  },
  mutations: {
    setCompany(state, company) {
      state.company = company;
    },
    logout(state) {
      state.company = {};
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      return api.login(email, password)
        .then(response => {
          let company = response.data;
          commit('setCompany', company);

          return company;
        });
    },
    
    addMachine({ commit, state }, machine) {
      const companyId = state.company.id;

      return api.addMachine(companyId, machine)
        .then(response => {
          return api.refreshCompany(companyId)
            .then(companyResponse => {
              commit('setCompany', companyResponse.data);

              return response.data;
            });
        });
    },

    updateMachine({ commit, state }, machine) {
      const companyId = state.company.id;

      return api.updateMachine(companyId, machine)
        .then(response => {
          return api.refreshCompany(companyId)
            .then(companyResponse => {
              commit('setCompany', companyResponse.data);

              return response.data;
            });
        });
    },

    deleteMachine({ commit, state }, machine) {
      return api.deleteMachine(machine.id)
        .then(response => {
          return api.refreshCompany(state.company.id)
            .then(company => {
              commit('setCompany', company.data);

              return response.data;
            });
        });
    }
  },
});
