import Ember from 'ember';
import StagesInitializer from 'respawn/initializers/stages';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | stages', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  StagesInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
