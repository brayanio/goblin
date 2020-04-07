import Ability from './ability.js'
import Equipment from './equipment.js'

const Power = stats => {
  let power = stats.strength
  if(power < stats.dexterity)
    power = stats.dexterity
  if(power < stats.intelligence)
    power = stats.intelligence
  if(power < stats.charisma)
    power = stats.charisma
  return Math.floor(power / 2)
}

const Weaponpower = (stats, weapon) => Math.floor(stats[Equipment.Items[weapon.split(' ').join('')].combat.damageStat] / 2)

const Will = stats => {
  let power = stats.intelligence
  if(power < stats.charisma)
    power = stats.charisma
  return Math.floor(power / 2)
}

const Athletics = stats => {
  let power = stats.strength
  if(power < stats.dexterity)
    power = stats.dexterity
  return Math.floor(power / 2)
}

const base = (unit, stats) => {
  let hp = 200 + (stats.strength * 12)
  let mana = 100 + ((stats.intelligence + stats.charisma) * 4)
  let ac = Equipment.Items[unit.equipment.Armor.split(' ').join('')].defense.ac
  let power = Power(stats)
  let weaponpower = Weaponpower(stats, unit.equipment.Weapon)
  let will = Will(stats)
  let athletics = Athletics(stats)
  let crit = 8 + stats.dexterity + power

  return { hp, mana, ac, power, crit, weaponpower, will, athletics }
}

const GameUnit = class {
  constructor(unit){
    this.unit = JSON.parse(JSON.stringify(unit))
    this.name = this.unit.name
    this.stats = this.unit.stats
    this.refresh()
    this.current = base(this.unit, this.stats)
    delete this.unit.name
  }

  refresh(){
    this.base = base(this.unit, this.stats)
  }
  
}

export default {GameUnit}