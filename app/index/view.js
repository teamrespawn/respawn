import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['index'],
  didInsertElement: function () {
    storyResize();

  }
});

function storyResize() {
  var wHeight = $(window).height();
  var spBtnHeight = $('.respawn-button').height();
  var searchHeight = $('.scouting-wrap').height();
  var termHeight = wHeight - (spBtnHeight + searchHeight) - 40;
  console.log(termHeight);
  $('.terminal').css('max-height', termHeight);
}
