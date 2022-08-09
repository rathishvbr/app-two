import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import UnAthu from './unauthenticate-error';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service cookie;

  headers = {
    Authorization: `Bearer ${this.cookie.getToken()}`,
  };

  handleResponse(status, headers, payload) {
    if (status === '401') {
        return new UnAthu();
    }
    return super.handleResponse(status, headers, payload);
  }
}
