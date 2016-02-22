import Ember from 'ember';
import Gif from './list';

export default Ember.Service.extend({
  checked: '',
  list: {
    scout1:{
      link:"https://49.media.tumblr.com/434ea8a55a89c9b9464aa25b28daef59/tumblr_nh27kfwwXs1tgmzako1_400.gif", 
      length: 6000
    },
    scout2:{
      link:"http://i.imgur.com/v2YUhcO.gif", 
      length: 3000
    },
    build1:{
      link:"https://media.giphy.com/media/9wjugx6EI9rS8/giphy.gif",
      length: 2000
    },
    build2:{
      link:"https://media.giphy.com/media/wisNbzeNJ0iVW/giphy.gif",
      length: 2000
    },
    weapon1:{
      link:"https://media.giphy.com/media/3vXHxnBAiZVUk/giphy.gif",
      length: 1500
    },
    weapon2:{
      link:"https://mycreativeramblings.files.wordpress.com/2013/03/walking-dead-governor-shooting-gif.gif",
      length: 1500
    },
    tech1:{
      link:"https://media.giphy.com/media/kawyKNEwEfWaA/giphy.gif",
      length: 3000
    },
    tech2:{
      link:"https://media.giphy.com/media/gK59ZlkQjLSTu/giphy.gif",
      length: 3000
    },
    respawn1:{
      link:"https://media.giphy.com/media/sdp6mLGIMbGWA/giphy.gif",
      length: 1500
    },
    respawn2:{
      link:"https://media.giphy.com/media/fHiz7HAUlSaIg/giphy.gif",
      length: 1500
    }
    
  },
  newGiphyAction(type) {
    console.log(this.get('checked'));
    var num = Math.floor((Math.random() * 2) + 1);
    var typenum = type+num;
    var gif = this.get("list")[typenum];
    this.set("current", gif);
    var giffy = this;
    Ember.run.later((function() {
      giffy.set("current", null);
    }), this.get('list')[typenum].length);
  }
});
