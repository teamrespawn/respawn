import Ember from 'ember';

export default Ember.Component.extend({
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  tagName: 'li',
  classNames: ['weapon-sale'],
  
  owned: Ember.computed('encampment.totalWeapons', function() {
    this.get('encampment.totalWeapons');
    var weaponType = this.get('weapon.storeKey');
    return this.get(`encampment.${weaponType}`) || 0;
  }),
  
  actions: {
    purchase: function(weapon) {
      this.get('encampment').purchaseWeapon(weapon);
    }
  }
});
