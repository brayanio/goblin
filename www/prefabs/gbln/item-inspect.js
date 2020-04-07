import Data from '../../../data/module.js'

import Layout from '../gl-layout.js'
import KeyValue from './key-value.js'

export default item => Layout.Card(
  Layout.CardHeader(item.name),
  Layout.Container('div', ['pad_thick'],
    item.ability ? KeyValue(item.ability.name, Layout.Bold(item.ability.desc)) : '',
    item.combat ? KeyValue('Slot', Layout.Bold(item.type.slot)) : '',
    item.combat ? KeyValue('Stat', Layout.Bold(Layout.cap(item.combat.damageStat))) : '',
    item.combat ? KeyValue('Damage', Layout.Bold(item.combat.attacks + 'd' + item.combat.damage)) : '',
    item.defense ? KeyValue('Armor Class', Layout.Bold(item.defense.ac)) : '',
    console.log(item) || '',
    ...(item.stats ? //stats
    Data.Stats.map(stat => Layout.If(item.stats[stat], 
      KeyValue(Layout.cap(stat), Layout.Bold(item.stats[stat]))
    )).filter(e=>e) : []),
    Layout.El('div', 'Tags:'),
    Layout.List('ul', 
      ...item.type.tags.map(t => Layout.Bold(t))
    )
  )
)