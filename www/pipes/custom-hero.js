import nggt from '../nggt.js'
import Data from '../../../data/module.js'

// pipe
const pipe = {
  Hero: nggt.pipe('name', {'race': Data.Races[0]}),
  Equipment: nggt.pipe(...Data.ItemSlots),
  Stats: nggt.pipe({
    total: 12,
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    charisma: 0
  }),
  selectedItem: nggt.dataObj(null)
}

pipe.val = () => { return {
  ...pipe.Hero.val(), //name, race
  stats: pipe.Stats.val(), //total, strength, dexterity, intelligence, charisma
  equipment: pipe.Equipment.val() //Weapon, Armor, Mark, Prop
} }

// data

const calcTotal = () => {
  const s = pipe.Stats.val()
  pipe.Stats.total.change(12 - s.strength - s.dexterity - s.intelligence - s.charisma)
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
  pipe.Hero.clear()
  subs.forEach(e => e.cleanup())
  pipe = {
    Hero: nggt.pipe('name', {'race': Data.Races[0]}),
    Equipment: nggt.pipe(...Data.ItemSlots),
    Stats: nggt.pipe({
      total: 12,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      charisma: 0
    })
  }
  subs = [
    pipe.Stats.strength.onChange(() => calcTotal()),
    pipe.Stats.dexterity.onChange(() => calcTotal()),
    pipe.Stats.intelligence.onChange(() => calcTotal()),
    pipe.Stats.charisma.onChange(() => calcTotal())
  ]
}

export default pipe