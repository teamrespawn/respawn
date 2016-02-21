import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['search-party'],
  searchPartySize: 0,
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  canIncrement: Ember.computed('searchPartySize', 'encampment.survivors', function() {
    return this.get('searchPartySize') < this.get('encampment.survivors');
  }),
  maxedOut: Ember.computed.not('canIncrement'),
  canDecrement: Ember.computed.gt('searchPartySize', 0),
  zeroedOut: Ember.computed.lte('searchPartySize', 0),
  
  actions: {
    resetSearchParty: function() {
      this.set('searchPartySize', 0);
    },
    incrementSearchParty: function() {
      if(this.get('canIncrement')) {
        this.incrementProperty('searchPartySize');
      }
    },
    decrementSearchParty: function() {
      if(this.get('canDecrement')) {
        this.decrementProperty('searchPartySize');
      }
    }
  }
});
