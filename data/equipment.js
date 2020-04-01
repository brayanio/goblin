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
  ItemsBySlotByTag = {},
  ItemsBySlotByCategoryByTag = {}

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

const getItemsBySlotByTags = (slot, tags) => tags.map(tag => {
  if(!ItemsBySlotByTag[slot] || !ItemsBySlotByTag[slot][tag]) return null
  return filterExcluded(ItemsBySlotByTag[slot][tag], tags)
}).filter(e=>e!==null)

const getItemsByCategoryFromSlotAndTags = (slot, tags) => {
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

  getItemsBySlotByTags,
  getItemsByCategoryFromSlotAndTags
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

const Tag = races.RaceTag
const Excl = (...a) => a.map(s => '!' + s)
// content
category( ItemCategory.Elven, 
  weapon('Dual Blades', 'dexterity', Tag.Humanoid, ...Excl(Tag.Devilkin, Tag.Creature)),
  weapon('Temptress', 'charisma', Tag.Humanoid, ...Excl(Tag.Divine))
)
category( ItemCategory.Dwarven,
  weapon('Crossbow', 'dexterity', Tag.Humanoid, ...Excl(Tag.Devilkin, Tag.Creature))
)
category( ItemCategory.Devilkin,
  weapon('Dark Glaive', 'strength', Tag.Humanoid, ...Excl(Tag.Divine, Tag.Creature))
)
category( ItemCategory.Orcish,
  weapon('Great Maul', 'strength', Tag.Humanoid, ...Excl(Tag.Divine, Tag.Creature))
)
category( ItemCategory.Construct,
  weapon('Flail', 'strength', Tag.Construct, Tag.Humanoid, ...Excl(Tag.Creature))
)
category( ItemCategory.Daemonic,
  weapon('Acid Spit', 'strength', Tag.Daemon, Tag.Chaotic, ...Excl(Tag.Humanoid))
)
category( ItemCategory.Druidic,
  weapon('Primal Claws', 'dexterity', Tag.Creature, Tag.Divine, ...Excl(Tag.Humanoid))
)
category( ItemCategory.Chaotic,
  weapon('Chaos Fangs', 'strength', Tag.Chaotic, Tag.Creature, ...Excl(Tag.Humanoid))
)

// exportObj : line 20
export default exportObj