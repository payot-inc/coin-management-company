import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// const HOST = 'http://api.payot-coin.com';
const HOST = 'http://localhost:3000';

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

    claimMachine(machineId, price, reason) {
        const path = getPath('/event/machine/:id/claim', { id: machineId })

        return axios.post(path, { amount: price, reason: reason });
    },

    companySales(companyId, start, end) {
        const startDate = moment(start).format('YYYY-MM-DD');
        const endDate = moment(end).format('YYYY-MM-DD');
        const path = getPath('/payments/company/:id', { id: companyId }, { start: startDate, end: endDate });

        return axios.get(path);
    },

    getCompanyUsers(companyId) {
        const path = getPath('/users/company/:id', { id: companyId });
        return axios.get(path);
    },

    updateMaintence(data) {
        const path = getPath('/maintenances')

        return axios.post(path, data);
    },

    addPoint(companyId, point) {
        const path = getPath('/event/company/:id/point', { id: companyId })

        return axios.post(path, { point });
    },

    sendSMS(companyId, message) {
        const path = getPath('/event/company/:id/sms', { id: companyId })
        
        return axios.post(path, { message, sendType: '업체에서 전송' });
    },

    refreshCompany(companyId) {
        const path = getPath('/company/:id', { id: companyId })

        return axios.get(path);
    }
}