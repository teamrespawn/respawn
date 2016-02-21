import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('weapon-sale', 'Integration | Component | weapon sale', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{weapon-sale}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#weapon-sale}}
      template block text
    {{/weapon-sale}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
