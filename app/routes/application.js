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
    // QUESTION: Why use Ember concurrency instead of than a promise with Ember Data?
    return {
      loadSongsTask: this.loadSongs.perform(),
      loadMeTask: this.loadMe.perform(),
    };
  }

  @task({ cancelOn: 'deactivate' })
  *loadSongs() {
    return yield this.store.findAll('song');
  }

  // QUESTION: What benefits is Ember concurrency giving use here?
  @task({ cancelOn: 'deactivate' })
  // QUESTION: why use the ajax service here instead of Ember Data and JSON API adapter?
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
