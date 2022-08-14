import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

module('Integration | Component | nav-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<NavBar />`);
    assert.dom(this.element).includesText('App Two');
  });

  test('check clear cookie action', async function (assert) {
    this.owner.register(
      'service:cookie',
      //Stub for cookie service
      class MockService extends Service {
        clearCookie() {
          assert.ok(true, 'clearCookie was called');
        }
      }
    );
    await render(hbs`<NavBar />`);
    await click('.t-clear-cookie');
  });

  test('check link to App one', async function (assert) {
    await render(hbs`<NavBar />`);
    assert.equal(
      this.element.getElementsByClassName('t-link-to-app-one')[0].href,
      'http://one.app.localhost:4200/'
    );
  });
});
