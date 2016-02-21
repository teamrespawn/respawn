import Ember from 'ember';

export default Ember.Component.extend({
  encampment: Ember.computed.alias('session.currentEncampment'),
  tagName: 'li',
  classNames: ['building-sale'],
  
  owned: Ember.computed('encampment.totalBuildings', function() {
    Ember.Logger.debug('Total buildings increased:', this.get('encampment.totalBuildings'));
    var buildingType = this.get('building.storeKey');
    return this.get(`encampment.${buildingType}`) || 0;
  }),
  
  actions: {
    purchaseBuilding: function(building) {
      this.get('encampment').purchaseBuilding(building);
    }
  }
});
