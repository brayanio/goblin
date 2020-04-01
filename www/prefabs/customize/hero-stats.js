import Gbln from '../gbln/module.js'
import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

const Stats = CustomHeroPipe.Stats
export default () => Glcss.Card( // total, strength, dexterity, intelligence, charisma
  Glcss.CardHeader(
    Layout.DataObj(Stats.total, statPoints => 
      Layout.El('span', `Stat Points: ${statPoints}`)
    )
  ),
  Gbln.Quantity('Strength', Stats.strength, Stats.total),
  Gbln.Quantity('Dexterity', Stats.dexterity, Stats.total),
  Gbln.Quantity('Intelligence', Stats.intelligence, Stats.total),
  Gbln.Quantity('Charisma', Stats.charisma, Stats.total)
)