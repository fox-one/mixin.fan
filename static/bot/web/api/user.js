import fetchJSON from 'higher-order-helper/fetchJSON';
import {host} from './config';

export class User {
  constructor({token = null, userInfo = null}) {
    this.token = token;
    this.userInfo = userInfo;
  }

  async fetchJSON(url, options = {}, auto_pop=true) {
    if (this.token) {
      options.headers = options.headers || {};
      options.headers['X-REQUEST-TOKEN'] = this.token;
    }
    return fetchJSON(url, options, auto_pop);
  }

  calcEarn(opts) {
    return this.fetchJSON(`${host}/api/calc/earn/`, {method: 'POST', body: JSON.stringify(opts)});
  }
}
