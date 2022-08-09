import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class NavBarComponent extends Component {
  @service cookie;

  @action
  clearToken() {
    this.cookie.clearCookie();
  }
}
