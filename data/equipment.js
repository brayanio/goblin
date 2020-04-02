import races from './races.js'

let exportObj

// consts
const ItemCategories = ['Elven', 'Dwarven', 'Devilkin', 'Orcish', 'Daemonic', 'Druidic', 'Construct', 'Chaotic', 'Creature']
let ItemCategory = {}
ItemCategories.forEach(i => ItemCategory[i] = i)

const ItemSlots = ['Weapon', 'Armor', 'Mark', 'Prop']
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
const item = (name, type, combat, defense) => {
  const obj = {name, type, combat}
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

const combat = (damageStat) => {
  return { combat: {damageStat} }
}

const defense = (ac) => {
  return { defense: {ac} }
}

// content utils
const weapon = (name, damageStat, ...tags) => {
  return { slot: ItemSlot.Weapon, name, tags, ...combat(damageStat) }
}
const armor = (name, tags, ac) => {
  return { slot: ItemSlot.Armor, name, tags, ...defense(ac) }
}
const mark = (name, tags) => {
  return { slot: ItemSlot.Mark, name, tags }
}
const prop = (name, tags) => {
  return { slot: ItemSlot.Prop, name, tags }
}
const category = (category, ...items) => 
  items.map(i => item(i.name, type(i.slot, category, i.tags), i.combat, i.defense))

const Tag = races.RaceTag //['Humanoid', 'Divine', 'Evil', 'Devilkin', 'Construct', 'Creature', 'Daemon', 'Chaotic']
const Exclude = (...a) => a.map(s => '!' + s)
// content
category( ItemCategory.Elven,
  weapon('Dual Blades', 'dexterity', Tag.Humanoid, ...Exclude(Tag.Devilkin, Tag.Creature, Tag.Construct)),
  weapon('Temptress', 'charisma', Tag.Humanoid, ...Exclude(Tag.Divine, Tag.Creature, Tag.Construct))
)
category( ItemCategory.Dwarven,
  weapon('Thunder Sniper', 'charisma', Tag.Divine, ...Exclude(Tag.Devilkin, Tag.Creature, Tag.Evil)),
  weapon('Rune Staff', 'intelligence', Tag.Humanoid, ...Exclude(Tag.Creature))
)
category( ItemCategory.Devilkin,
  weapon('Dark Glaive', 'strength', Tag.Humanoid, ...Exclude(Tag.Divine, Tag.Creature)),
  weapon('Orb of Hate', 'charisma', Tag.Devilkin, Tag.Evil, ...Exclude(Tag.Divine, Tag.Creature, Tag.Construct))
)
category( ItemCategory.Orcish,
  weapon('Chainblade Maul', 'strength', Tag.Humanoid, Tag.Construct, ...Exclude(Tag.Divine, Tag.Creature)),
  weapon('Hand Cannon', 'dexterity', Tag.Humanoid, Tag.Construct, ...Exclude(Tag.Creature))
)
category( ItemCategory.Construct,
  weapon('Flamebreath', 'charisma', Tag.Construct, Tag.Daemon, ...Exclude(Tag.Humanoid)),
  weapon('Chainblade', 'strength', Tag.Construct, Tag.Humanoid, ...Exclude(Tag.Creature))
)
category( ItemCategory.Daemonic,
  weapon('Gore Spikes', 'strength', Tag.Daemon, Tag.Construct, ...Exclude(Tag.Humanoid, Tag.Divine)),
  weapon('Acid Spit', 'strength', Tag.Daemon, Tag.Chaotic, ...Exclude(Tag.Humanoid, Tag.Construct))
)
category( ItemCategory.Druidic,
  weapon('Feral Claws', 'dexterity', Tag.Creature, ...Exclude(Tag.Humanoid, Tag.Construct)),
  weapon('Unicorn', 'dexterity', Tag.Divine, ...Exclude(Tag.Humanoid, Tag.Daemon, Tag.Chaotic, Tag.Evil, Tag.Devilkin, Tag.Construct)),
  weapon('Pentacorn', 'charisma', Tag.Devilkin, Tag.Daemon, ...Exclude(Tag.Divine, Tag.Chaotic, Tag.Construct))
)
category( ItemCategory.Chaotic,
  weapon('Chaos Fangs', 'strength', Tag.Chaotic, Tag.Creature, ...Exclude(Tag.Humanoid, Tag.Construct)),
  weapon('Scorpion Tail', 'dexterity', Tag.Chaotic, Tag.Creature, ...Exclude(Tag.Humanoid, Tag.Construct))
)

// exportObj : line 20
export default exportObj