import Layout from '../gl-layout.js'
import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

const Equipment = CustomHeroPipe.Equipment
export default () => Layout.Card(
  Layout.CardHeader('Equipment'),
  Layout.List('ul', ...Data.ItemSlots.map(slot =>
    Layout.DataObj(Equipment[slot], i => `${slot}: ${i ? i.name : ''}`)
  ))
)