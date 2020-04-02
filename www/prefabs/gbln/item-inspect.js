import Data from '../../../data/module.js'

import Layout from '../gl-layout.js'

export default item => Layout.Card(
  Layout.CardHeader(item.name),
    Layout.El('div', 'Slot: ', Layout.Bold(item.type.slot)),
    item.combat ? Layout.El('div', 'Stat: ', Layout.Bold(Layout.cap(item.combat.damageStat))) : '',
    Layout.El('div', 'Tags:'),
    Layout.List('ul', 
      ...item.type.tags
    )
)