import Ember from 'ember';
import Text from './text';
import Collection from './collection';

export default Ember.Service.extend({
  list: [],
  
  newTextMessage(text) {
    var message = Text.create({
      text: text
    });
    this.get('list').pushObject(message);
  },
  
  newCollectionMessage(text, items) {
    var message = Collection.create({
      text: text,
      items: items
    });
    this.get('list').pushObject(message);
  }
});
