import Ember from 'ember';

export default Ember.Component.extend({
  encampment: Ember.computed.alias('session.currentEncampment'),
  giphy: Ember.inject.service(),
  tagName: 'li',
  classNames: ['building-sale'],
  
  owned: Ember.computed('encampment.totalBuildings', function() {
    this.get('encampment.totalBuildings');
    var buildingType = this.get('building.storeKey');
    return this.get(`encampment.${buildingType}`) || 0;
  }),
  
  actions: {
    purchaseBuilding: function(building) {
      this.get('encampment').purchaseBuilding(building);
      this.get('giphy').newGiphyAction('build');
    }
  }
});
