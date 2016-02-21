import Ember from 'ember';
import Weapon from './weapon';

export default Ember.Service.extend({
  types: Ember.computed.collect('bearTrap', 'chainsaw', 'pistol', 'shotgun', 'rpg'),
  
  bearTrap: Weapon.create({
    name: 'bear trap'
  }),
  
  chainsaw: Weapon.create({
    name: 'chainsaw'
  }),
  
  pistol: Weapon.create({
    name: 'pistol'
  }),
  
  shotgun: Weapon.create({
    name: 'shotgun'
  }),
  
  rpg: Weapon.create({
    name: 'rpg'
  })
});
