import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
  });

  test('it should have a tokenForDisplay to display', function (assert) {
    let controller = this.owner.lookup('controller:application');
    assert.equal(controller.tokenForDisplay.token, 'test-token');
  });
});
