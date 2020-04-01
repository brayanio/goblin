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

const getItemsBySlotByTags = (slot, tags) => tags.map(tag => {
  if(!ItemsBySlotByTag[slot] || !ItemsBySlotByTag[slot][tag]) return null
  return ItemsBySlotByTag[slot][tag].filter(item => checkExcluded(item, tags))
}).filter(e=>e!==null)

// export
exportObj = {
  ItemSlots, // ['Weapon', 'Armor', 'Mark', 'Prop']
  ItemSlot, // ItemSlot.Weapon
  ItemCategories, // ['Elven', 'Dwarven', 'Devilkin', 'Orcish', 'Daemonic', 'Druidic', 'Construct', 'Chaotic', 'Creature']
  ItemCategory, // ItemCategory.Elven

  Items, // Items.DualBlades
  ItemsByCategory, // ItemsByCategory.Elven
  ItemsByTag, // ItemsByTag.Humanoid
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
const weapon = (name, tags, damageStat) => {
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

// content
category( ItemCategory.Elven, 
  weapon('Dual Blades', ['Humanoid', '!Devilkin', '!Creature'], 'dexterity')
)
category( ItemCategory.Dwarven,
  weapon('Crossbow', ['Humanoid', '!Devilkin', '!Creature'], 'dexterity')
)
category( ItemCategory.Devilkin,
  weapon('Dark Glaive', ['Humanoid', '!Divine', '!Creature'], 'strength')
)
category( ItemCategory.Orcish,
  weapon('Great Maul', ['Humanoid', '!Divine', '!Creature'], 'strength')
)
category( ItemCategory.Construct,
  weapon('Flail', ['Construct', 'Humanoid', '!Creature'], 'strength')
)
category( ItemCategory.Daemonic,
  weapon('Acid Spit', ['Daemonic', '!Humanoid'], 'strength')
)
category( ItemCategory.Druidic,
  weapon('Primal Claws', ['Creature', 'Divine', '!Humanoid'], 'dexterity')
)
category( ItemCategory.Chaotic,
  weapon('Chaos Fangs', ['Chaotic', 'Creature', '!Humanoid'], 'strength')
)

// exportObj : line 20
export default exportObj