import Ember from 'ember';

export default Ember.Component.extend({
  searchPartySize: 0,
  searchable: Ember.computed.gt('searchPartySize', 0),
  
  tagName: 'button',
  classNames: ['search-party-action'],
  classNameBindings: ['searchable:enabled'],
  
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  messages: Ember.inject.service(),
  
  click(e) {
    e.preventDefault();
    var partySize = this.get('searchPartySize');
    if(this.get('searchable')) {
      this.get('messages').newTextMessage(`Sending out a search party of ${partySize} survivors...`);
      this.get('encampment').collectResources(partySize);
      this.sendAction('reset');
    } else {
      this.get('messages').newTextMessage("You haven't assigned any survivors to the search party...", "error");
    }
  }
});
