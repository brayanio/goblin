import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'
import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

const Equipment = CustomHeroPipe.Equipment
export default pipe => Glcss.Card(
  Glcss.CardHeader('Equipment'),
  Layout.UL('Weapon', 'Armor', 'Mark', 'Prop')
)