import Ember from 'ember';
// import {$} from 'ember';
export default Ember.View.extend({
  classNames: ['game'],
  didInsertElement: function () {
    storyResize();
    $(window).resize(function () {
      storyResize();
    });
  }
  
});
function mapReplace($gifvid, $src) {
  if($gifvid === "gif") {

  } else {

  }
}
function storyResize() {
  var wHeight = $(window).height();
  var spBtnHeight = $('.respawn-button').height();
  var searchHeight = $('.scouting-wrap').height();
  var termHeight = ( wHeight - (spBtnHeight + searchHeight) ) - 80;

  var storyWidth = $('.story-feed').width() - 40;
  $('.terminal').css('max-height', termHeight);
  $('.terminal').css('width', storyWidth);
}
