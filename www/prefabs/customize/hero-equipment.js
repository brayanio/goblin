import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'
import Gbln from '../gbln/module.js'

const Equipment = CustomHeroPipe.Equipment
export default () => Layout.Card(
  Layout.CardHeader('Equipment'),
  Layout.Container('div', ['pad_thick'],
    ...Data.ItemSlots.map(slot =>
      Layout.DataObj(Equipment[slot], i => 
        Gbln.KeyValue(slot, i ? Layout.Bold(i.name) : '')
      )
    )
  )
)