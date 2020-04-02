import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'
import Gbln from '../gbln/module.js'

const Stats = CustomHeroPipe.Stats
export default () => Layout.Card( // total, strength, dexterity, intelligence, charisma
  Layout.CardHeader(
    Layout.DataObj(Stats.total, statPoints => `Stat Points: ${statPoints}`)
  ),
  Layout.Map(Data.Stats, stat => Gbln.Quantity(stat))
)