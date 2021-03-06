import Equipment from './equipment.js'
import Races from './races.js'
import RaceDescriptions from './race-desc.js'
import Unit from './unit.js'

const Stats = ['strength', 'dexterity', 'intelligence', 'charisma']

export default {
  ...Equipment,
  ...Races,
  RaceDescriptions,
  Stats,
  ...Unit
}