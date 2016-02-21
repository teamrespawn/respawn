import Ember from 'ember';

export default Ember.Component.extend({
  searchPartySize: 0,
  
  tagName: 'button',
  classNames: ['search-party'],
  
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  click(e) {
    e.preventDefault();
    Ember.Logger.debug('search button clicked');
    this.get('encampment').collectResources(this.get('searchPartySize'));
  }
});
