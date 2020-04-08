import nggt from '../../../nggt/nggt.js'
import Data from '../../../data/module.js'

const Stats = () => {return {
  total: 6,
  strength: 0,
  dexterity: 0,
  intelligence: 0,
  charisma: 0
}}

// pipe
const pipe = {
  Hero: nggt.pipe('name', {'race': Data.Races[0]}),
  Equipment: nggt.pipe(...Data.ItemSlots),
  Stats: nggt.pipe(Stats()),
  selectedItem: nggt.dataObj(null)
}

const refresh = stat => {
  let statpoints = pipe.Stats[stat].val(), racial = 0, item = 0
  if(pipe.Hero.race.val())
    racial = pipe.Hero.race.val().stats[stat]
  Data.ItemSlots.forEach(slot => {
    if(pipe.Equipment[slot].val())
      if(pipe.Equipment[slot].val().stats && pipe.Equipment[slot].val().stats[stat])
        item += pipe.Equipment[slot].val().stats[stat]
  })
  return statpoints + racial + item
}

const refreshStats = () => {
  let stats = {}  
  Data.Stats.forEach(stat => stats[stat] = refresh(stat))
  return stats
}

const equipment = () => {
  let equipment = {}
  Data.ItemSlots.forEach(slot => equipment[slot] = pipe.Equipment[slot].val().name)
  return equipment
}

pipe.unit = () => { return {
  name: pipe.Hero.name.val(),
  race: pipe.Hero.race.val().name,
  stats: refreshStats(), //total, strength, dexterity, intelligence, charisma
  equipment: equipment() //Weapon, Armor, Trinket, Prop
}}

// data

const calcTotal = () => {
  const s = pipe.Stats.val()
  pipe.Stats.total.change(6 - s.strength - s.dexterity - s.intelligence - s.charisma)
}
let subs = [
  pipe.Stats.strength.onChange(() => calcTotal()),
  pipe.Stats.dexterity.onChange(() => calcTotal()),
  pipe.Stats.intelligence.onChange(() => calcTotal()),
  pipe.Stats.charisma.onChange(() => calcTotal()),

  ...Data.ItemSlots.map(slot => pipe.Equipment[slot].onChange(i => pipe.selectedItem.change(i)))
]

// cleanup

pipe.cleanup = () => {
  pipe.Hero.cleanup()
  pipe.Equipment.cleanup()
  pipe.Stats.cleanup()
  pipe.selectedItem.clear()
}

export default pipe