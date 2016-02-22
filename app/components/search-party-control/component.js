import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['search-party'],
  searchPartySize: 0,
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  messages: Ember.inject.service(),
  
  canIncrement: Ember.computed('searchPartySize', 'encampment.availableSurvivors', function() {
    return this.get('searchPartySize') < this.get('encampment.availableSurvivors');
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
      } else {
        this.get('messages').newTextMessage("You don't have any more survivors to add.", "error");
      }
    },
    decrementSearchParty: function() {
      if(this.get('canDecrement')) {
        this.decrementProperty('searchPartySize');
      } else {
        this.get('messages').newTextMessage("Your search party is already empty.", "error");
      }
    }
  }
});


