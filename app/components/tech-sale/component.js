import Ember from 'ember';

export default Ember.Component.extend({
  encampment: Ember.computed.alias('session.currentEncampment'),
  giphy: Ember.inject.service(),
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
      this.get('giphy').newGiphyAction('tech');
    }
  }
});
