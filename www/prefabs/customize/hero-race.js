import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'
import Gbln from '../gbln/module.js'

const Hero = CustomHeroPipe.Hero
export default () => Layout.DataObj(Hero.race, r => Layout.Card(
  Layout.CardHeader(`${r.name} Bonus`),
  Layout.Container('div', ['pad_thick'],
    ...Data.Stats.map(stat => Layout.If(r.stats[stat], 
      Gbln.KeyValue(Layout.cap(stat), Layout.Bold(r.stats[stat]))
    )).filter(e=>e),
    'Tags',
    Layout.List('ul', ...r.tags.map(t => Layout.Bold(t)))
  )
))