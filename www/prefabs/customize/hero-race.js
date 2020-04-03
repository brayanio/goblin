import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'

const Hero = CustomHeroPipe.Hero
export default () => Layout.DataObj(Hero.race, r => Layout.Card(
  Layout.CardHeader(`${r.name} Bonus`),
  Layout.Container('div', ['pad_thick'],
    'Stats',
    Layout.List('ul', ...Data.Stats.map(stat => Layout.If(r.stats[stat], 
      Layout.cap(stat) + ': ' + Layout.Bold(r.stats[stat])
    )).filter(e=>e)),
    'Tags',
    Layout.List('ul', ...r.tags.map(t => Layout.Bold(t)))
  )
))