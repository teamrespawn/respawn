import Ember from 'ember';

export default Ember.Component.extend({
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  tagName: 'li',
  classNames: ['tech-sale'],
  
  owned: Ember.computed('encampment.totalTechnologies', function() {
    this.get('encampment.totalTechnologies');
    var techType = this.get('tech.storeKey');
    return this.get(`encampment.${techType}`) || 0;
  }),
  
  actions: {
    purchase: function(tech) {
      this.get('encampment').purchaseTech(tech);
    }
  }
});
