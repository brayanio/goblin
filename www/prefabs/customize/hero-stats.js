import Gbln from '../gbln/module.js'
import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'
import Data from '../../../data/module.js'

const Stats = CustomHeroPipe.Stats
export default () => Glcss.Card( // total, strength, dexterity, intelligence, charisma
  Glcss.CardHeader(
    Layout.DataObj(Stats.total, statPoints => `Stat Points: ${statPoints}`)
  ),
  Layout.Map(Data.Stats, stat => Gbln.Quantity(stat))
)