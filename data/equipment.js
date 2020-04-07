import races from './races.js'
import abilities from './ability.js'

let exportObj

// consts
const ItemCategories = ['Elven', 'Dwarven', 'Devilkin', 'Orcish', 'Daemonic', 'Druidic', 'Construct', 'Chaotic', 'Creature']
let ItemCategory = {}
ItemCategories.forEach(i => ItemCategory[i] = i)

const ItemSlots = ['Weapon', 'Armor', 'Prop', 'Trinket']
let ItemSlot = {}
ItemSlots.forEach(i => ItemSlot[i] = i)

// const lets
let Items = {},
  ItemsByCategory = {},
  ItemsByTag = {},
  ItemsBySlot = {},
  ItemsBySlotByCategory = {},
  ItemsBySlotByTag = {}

const checkExcluded = (item, tags) => tags.find(t => item.type.excludedTags[t]) === undefined
const filterExcluded = (items, tags) => items.filter(i => checkExcluded(i, tags))
const filterResults = (obj, tags) => {
  let res = {}, ar
  Object.keys(obj).forEach(key => {
    ar = filterExcluded(obj[key], tags)
    if(ar.length > 0)
      res[key] = ar
  })
  return res
}

const getItemsBySlotByTags = (slot, tags) => {
  if(!ItemsBySlotByCategory[slot]) return null
  return filterResults(ItemsBySlotByCategory[slot], tags)
}

// export
exportObj = {
  ItemSlots, // ['Weapon', 'Armor', 'Mark', 'Prop']
  ItemSlot, // ItemSlot.Weapon
  ItemCategories, // ['Elven', 'Dwarven', 'Devilkin', 'Orcish', 'Daemonic', 'Druidic', 'Construct', 'Chaotic', 'Creature']
  ItemCategory, // ItemCategory.Elven

  Items, // Items.DualBlades
  ItemsByTag, // ItemsByTag.Humanoid
  ItemsByCategory, // ItemsByCategory.Elven
  ItemsBySlot,  // ItemsBySlot.Weapon
  ItemsBySlotByCategory, // ItemsBySlotByCategory.Weapon.Elven
  ItemsBySlotByTag, // ItemsBySlotByTag.Weapon.Humanoid
  // ItemsCategorySlotTag, // ItemsCategorySlotTag.Elven.Weapon.Humanoid

  getItemsBySlotByTags
}

const registerItem = obj => {
  const id = obj.name.split(' ').join(''), category = obj.type.category, slot = obj.type.slot, 
    tags = obj.type.requiredTags.length > 0 ? obj.type.requiredTags : obj.type.tags

  Items[id] = obj
  ItemsByCategory[category] ? ItemsByCategory[category].push(obj) : ItemsByCategory[category] = [obj]
  ItemsBySlot[slot] ? ItemsBySlot[slot].push(obj) : ItemsBySlot[slot] = [obj]
  if(!ItemsBySlotByCategory[slot])
    ItemsBySlotByCategory[slot] = {[category]: [obj]}
  else if(!ItemsBySlotByCategory[slot][category])
    ItemsBySlotByCategory[slot][category] = [obj]
  else
    ItemsBySlotByCategory[slot][category].push(obj)

  
  tags.forEach(tag => {
    ItemsByTag[tag] ? ItemsByTag[tag].push(obj) : ItemsByTag[tag] = [obj]
    if(!ItemsBySlotByTag[slot])
      ItemsBySlotByTag[slot] = {[tag]: [obj]}
    else if(!ItemsBySlotByTag[slot][tag])
      ItemsBySlotByTag[slot][tag] = [obj]
    else
      ItemsBySlotByTag[slot][tag].push(obj)
  })
}

// item fn
const item = (name, type, stats, combat, defense, ability) => {
  const obj = {name, type}
  if(combat) obj.combat = combat
  if(defense) obj.defense = defense
  if(ability) obj.ability = ability
  if(stats) obj.stats = stats
  registerItem(obj)
  return obj
}

// item data
const type = (slot, category, tags) => {
  const requiredTags = {}
  tags.forEach(s => s.substr(0, 1) !== '!' ? requiredTags[s] = s : null)
  let excludedTags = {}
  tags.forEach(s => s.substr(0, 1) === '!' ? excludedTags[s.substr(1)] = s.substr(1) : null)
  return { slot, category, requiredTags, excludedTags,
    tags: Object.values(requiredTags)
  }
}

const combat = (damageStat, damage, attacks) => {
  return { combat: {damageStat, damage, attacks} }
}

const defense = (ac) => {
  return { defense: {ac} }
}

const ability = (ability) => {
  return { ability }
}

// content utils
const weapon = (name, a, damageStat, damage, attacks, ...tags) => {
  return { slot: ItemSlot.Weapon, name, tags, ...combat(damageStat, damage, attacks), ...ability(a) }
}
const armor = (name, ac, stats, ...tags) => {
  return { slot: ItemSlot.Armor, name, tags, stats, ...defense(ac) }
}
const trinket = (name, a, stats, ...tags) => {
  return { slot: ItemSlot.Trinket, name, tags, stats, ...ability(a) }
}
const prop = (name, a, stats, ...tags) => {
  return { slot: ItemSlot.Prop, name, tags, stats, ...ability(a) }
}
const category = (category, ...items) => 
  items.map(i => item(i.name, type(i.slot, category, i.tags), i.stats, i.combat, i.defense, i.ability))

const Tag = races.RaceTag //['Humanoid', 'Divine', 'Evil', 'Devilkin', 'Construct', 'Creature', 'Daemon', 'Chaotic']
const Ability = abilities.Ability
const Exclude = (...a) => a.map(s => '!' + s)
// content
category( ItemCategory.Elven,
  // 
  weapon('Dual Blades', Ability.Counter, 'dexterity', 6, 2, Tag.Humanoid, ...Exclude(Tag.Devilkin, Tag.Creature, Tag.Construct)),
  // weapon('Temptress', 'charisma', 8, 1, Tag.Humanoid, ...Exclude(Tag.Divine, Tag.Creature, Tag.Construct)),
  // 
  armor('Leaf Plate', 12, {dexterity: 2}, Tag.Humanoid, ...Exclude(Tag.Devilkin, Tag.Creature, Tag.Construct, Tag.Evil)),
  // 
  trinket('Idol of Faith', Ability.Restore, {charisma: 2}, Tag.Divine, ...Exclude(Tag.Creature, Tag.Construct)),
  // 
  prop('Panther', Ability.Pounce, {}, Tag.Divine, ...Exclude(Tag.Construct, Tag.Daemon))
)
category( ItemCategory.Dwarven,
  // 
  weapon('Thunder Sniper', Ability.Headshot, 'intelligence', 12, 1, Tag.Divine, ...Exclude(Tag.Devilkin, Tag.Creature, Tag.Evil)),
  // weapon('Rune Staff', 'intelligence', 6, 1, Tag.Humanoid, ...Exclude(Tag.Creature)),
  // 
  armor('Fancy Suit', 11, {intelligence: 3}, Tag.Humanoid, ...Exclude(Tag.Creature, Tag.Construct, Tag.Evil)),
  // 
  trinket('Compass', Ability.Truesight, {intelligence: 2}, Tag.Divine, ...Exclude(Tag.Creature)),
  // 
  prop('Iron Defender', Ability.IronClamp, {}, Tag.Divine)
)
category( ItemCategory.Devilkin,
  // 
  weapon('Dark Glaive', Ability.LifeDrain, 'strength', 10, 1, Tag.Humanoid, ...Exclude(Tag.Divine, Tag.Creature)),
  // weapon('Orb of Hate', 'charisma', 6, 1, Tag.Devilkin, Tag.Evil, ...Exclude(Tag.Divine, Tag.Creature, Tag.Construct)),
  // 
  armor('Infernal Plate', 11, {strength: 3}, Tag.Humanoid, ...Exclude(Tag.Divine, Tag.Creature)),
  // 
  trinket('Hag Head', Ability.Horrify, {charisma: 4}, Tag.Devilkin, ...Exclude(Tag.Divine, Tag.Construct)),
  // 
  prop('Flaming Chain', Ability.Domination, {}, Tag.Devilkin, ...Exclude(Tag.Creature, Tag.Construct))
)
category( ItemCategory.Orcish,
  // 
  weapon('Chainblade', Ability.Chainsaw, 'strength', 6, 2, Tag.Humanoid, Tag.Construct, ...Exclude(Tag.Creature)),
  // weapon('Hand Cannon', 'dexterity', 10, 1, Tag.Humanoid, Tag.Construct, ...Exclude(Tag.Creature)),
  // 
  armor('Ogre Mechsuit', 15, {}, Tag.Humanoid, ...Exclude(Tag.Creature, Tag.Divine)),
  // 
  trinket('Totem', Ability.Blessing, {}, Tag.Humanoid, ...Exclude(Tag.Construct)),
  // 
  prop('War Drums', Ability.HavocHarmony, {strength: 2, dexterity: 2}, Tag.Evil, ...Exclude(Tag.Construct))
)
category( ItemCategory.Construct,
  // 
  weapon('Flamebreath', Ability.Burn, 'charisma', 4, 4, Tag.Construct, Tag.Daemon, ...Exclude(Tag.Humanoid)),
  // weapon('Chainblade', 'strength', 4, 3, Tag.Construct, Tag.Humanoid, ...Exclude(Tag.Creature)),
  // 
  armor('Steam Mech', 10, {strength: 2, charisma: 2}, Tag.Construct, ...Exclude(Tag.Divine, Tag.Creature)),
  // 
  trinket('Clockwork Scarabs', Ability.ScarabSwarm, {}, Tag.Construct, ...Exclude(Tag.Creature, Tag.Humanoid)),
  // 
  prop('Steam Battery', Ability.Energize, {strength: 2, charisma: 2}, Tag.Construct, ...Exclude(Tag.Creature, Tag.Humanoid))
)
category( ItemCategory.Daemonic,
  // 
  // weapon('Gore Spikes', 'strength', 4, 2, Tag.Daemon, Tag.Construct, ...Exclude(Tag.Humanoid, Tag.Divine)),
  weapon('Acid Bite', Ability.Melt, 'strength', 10, 1, Tag.Daemon, Tag.Chaotic, ...Exclude(Tag.Humanoid, Tag.Construct)),
  // 
  armor('Gluttony', 14, {strength: 1}, Tag.Daemon, Tag.Devilkin, Tag.Chaotic, ...Exclude(Tag.Construct, Tag.Divine)),
  // 
  trinket('Acid Sacs', Ability.AcidReflect, {charisma: 1}, Tag.Daemon, ...Exclude(Tag.Construct, Tag.Divine, Tag.Humanoid)),
  // props: offhand, accesory, companion, 
  prop('Acid Catapult', Ability.AcidSiege, {strength: 1}, Tag.Daemon, ...Exclude(Tag.Construct, Tag.Divine, Tag.Chaotic, Tag.Evil))
)
category( ItemCategory.Druidic,
  // 
  weapon('Feral Claws', 'dexterity', 4, 2, Tag.Creature, ...Exclude(Tag.Humanoid, Tag.Construct)),
  weapon('Unicorn', Ability.Hope, 'dexterity', 6, 1, Tag.Divine, ...Exclude(Tag.Daemon, Tag.Chaotic, Tag.Evil, Tag.Devilkin, Tag.Construct)),
  weapon('Pentacorn', Ability.SearingPain, 'charisma', 6, 1, Tag.Devilkin, Tag.Daemon, ...Exclude(Tag.Divine, Tag.Chaotic, Tag.Construct)),
  // 
  armor('Barkskin', 11, {dexterity: 1, charisma: 2}, Tag.Divine, ...Exclude(Tag.Daemon, Tag.Evil, Tag.Devilkin, Tag.Construct)),
  // 
  trinket('Seed of Regeneration', Ability.Regenerate, {charisma: 3}, Tag.Divine, ...Exclude(Tag.Devilkin, Tag.Evil, Tag.Daemon, Tag.Chaotic)),
  //
  prop('Fungus Growth', Ability.Stun, {}, Tag.Divine, ...Exclude(Tag.Construct))
)
category( ItemCategory.Chaotic,
  //
  weapon('Chaos Fangs', Ability.Swift, 'strength', 6, 2, Tag.Chaotic, Tag.Creature, ...Exclude(Tag.Humanoid, Tag.Construct)),
  // weapon('Scorpion Tail', 'dexterity', 8, 1, Tag.Chaotic, Tag.Creature, ...Exclude(Tag.Humanoid, Tag.Construct)),
  //
  armor('Elemental Form', 13, {dexterity: 1, charisma: 1}, Tag.Chaotic, Tag.Daemon, Tag.Divine, ...Exclude(Tag.Humanoid)),
  // 
  trinket('Wings', Ability.Ascend, {dexterity: 2}, Tag.Chaotic, ...Exclude(Tag.Humanoid)),
  //
  prop('Scorpion Tail', Ability.MultiAttack, {dexterity: 1}, Tag.Chaotic, ...Exclude(Tag.Humanoid, Tag.Construct))
)

// exportObj : line 20
export default exportObj