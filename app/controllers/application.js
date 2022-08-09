import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service cookie;
  @service store;

  get tokenForDisplay() {
    return { token: this.cookie.getToken() };
  }

  @action
  refreshSongsInStore() {
    this.store.findAll('song');
  }
}
