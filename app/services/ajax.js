import { inject as service } from '@ember/service';

import AjaxService from 'ember-ajax/services/ajax';

export default class OverridenAjaxService extends AjaxService {
  @service cookie;

  contentType = 'application/vnd.api+json';

  get headers() {
    let headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request() {
    // because the getAccessToken() function is async, we need to do it
    // on the request method, before the request itself.
    // using it on the `headers` getter wouldn't work since a getter can't be async
    this.token = await this.cookie.getToken();
    return super.request(...arguments);
  }
}
