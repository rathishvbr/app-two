import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LogoutRoute extends Route {
  @service cookie;

  async beforeModel() {
    this.cookie.logout();
  }
}
