import Data from '../../../data/module.js'
import CHPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'
import Gbln from '../gbln/module.js'
import Quantity from './quantity.js'

const Stats = CHPipe.Stats
export default () => Layout.Card( // total, strength, dexterity, intelligence, charisma
  Layout.CardHeader(
    Layout.DataObj(Stats.total, statPoints => `Stat Points: ` + Layout.Bold(statPoints))
  ),
  Layout.Container('div', ['pad_thick'],
    Layout.Map(Data.Stats, stat => Quantity(stat))
  )
)