import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const HOST = 'http://api.payot-coin.com';

// 경로 추출
function getPath(path, params = null, query = null) {
    let pathParam = path;
  
    if (params) {
      Object.keys(params).forEach((key) => {
        pathParam = pathParam.replace(`:${key}`, `${params[key]}`);
      });
    }
  
    if (query) {
      const pathQuery = Object.keys(query).map(key => `${key}=${encodeURI(query[key])}`).join('&');
      return `${HOST}${pathParam}?${pathQuery}`;
    }
    return `${HOST}${pathParam}`;
  }

export default {
    login(email, password) {
        const path = getPath('/company/login');
        return axios.post(path, { email, password });
    },

    addMachine(companyId, machine) {
        const path = getPath('/machine');
        machine.companyId = companyId;

        return axios.post(path, machine)
    },

    updateMachine(companyId, machine) {
        const path = getPath('/machine/:id', { id: companyId });

        return axios.put(path, machine);
    },

    deleteMachine(machineId) {
        const path = getPath('/machine/:id', { id: machineId })

        return axios.delete(path);
    },

    refreshCompany(companyId) {
        const path = getPath('/company/:id', { id: companyId })

        return axios.get(path);
    }
}