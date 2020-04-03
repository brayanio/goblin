import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'

const Equipment = CustomHeroPipe.Equipment
export default () => Layout.Card(
  Layout.CardHeader('Equipment'),
  Layout.List('ul', ...Data.ItemSlots.map(slot =>
    Layout.DataObj(Equipment[slot], i => `${slot}: ${i ? Layout.Bold(i.name) : ''}`)
  ))
)