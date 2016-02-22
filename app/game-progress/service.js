import Ember from 'ember';
import Stage from './stage';

export default Ember.Service.extend({
  currentStage: 0,
  
  stages: [
    Stage.create({
      stageNumber: 1,
      message: 'Welcome to Respawn'
    })
  ],
  
  session: Ember.inject.service(),
  messages: Ember.inject.service(),
  
  atBeginning: Ember.computed.lte('currentStage', 0),
  
  handleStageChange: Ember.observer('currentStage', function() {
    var stageNumber = this.get('currentStage');
    var stage = this.get('stages').findBy('stageNumber', stageNumber);
    
    this.get('messages').newTextMessage(stage.get('message'));
  }),
  
  advanceStage() {
    return this.incrementProperty('currentStage');
  },
  
  canSearch: Ember.computed.gt('session.currentEncampment.survivors', 0)
});
