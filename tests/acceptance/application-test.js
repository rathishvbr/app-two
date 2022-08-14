import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('should list songs from the store', async function (assert) {
    this.server.createList('song', 10);
    await visit('/');
    assert.equal(currentURL(), '/');
    assert.equal(this.element.querySelectorAll('.t-song').length, 10);
  });
});
