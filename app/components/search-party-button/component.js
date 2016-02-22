import Ember from 'ember';

export default Ember.Component.extend({
  searchPartySize: 0,
  
  tagName: 'button',
  classNames: ['search-party-action'],
  
  session: Ember.inject.service(),
  giphy: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  messages: Ember.inject.service(),
  
  click(e) {
    e.preventDefault();
    var partySize = this.get('searchPartySize');
    this.get('messages').newTextMessage(`Sending out a search party of ${partySize} survivors...`);
    this.get('encampment').collectResources(partySize);
    this.get('giphy').newGiphyAction('scout');
    this.sendAction('reset');
  }
});
