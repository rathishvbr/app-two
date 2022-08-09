import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { action } from '@ember/object';
import UnAthu from '../adapters/unauthenticate-error';

export default class ApplicationRoute extends Route {
  @service store;
  @service cookie;
  @service ajax;

  async beforeModel() {
    await this.cookie.handleAuthentication();
  }

  model() {
    return {
      loadSongsTask: this.loadSongs.perform(),
      loadMeTask: this.loadMe.perform(),
    };
  }

  @task({ cancelOn: 'deactivate' })
  *loadSongs() {
    return yield this.store.findAll('song');
  }

  @task({ cancelOn: 'deactivate' })
  *loadMe() {
    let request = yield this.ajax.request('/users/me');
    return request.data.attributes;
  }

  @action
  error(error, transition) {
    if (error instanceof UnAthu) {
      this.cookie.logout();
      return;
    }
  }
}
