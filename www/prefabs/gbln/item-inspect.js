import Layout from '../gl-layout.js'
import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

const Equipment = CustomHeroPipe.Equipment
export default () => Layout.Card(
  Layout.CardHeader('Item Name')
)