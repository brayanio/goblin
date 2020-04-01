import nggt from '../../nggt.js'
import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'

import Data from '../../../data/module.js'

export default pipe => {
  console.log(pipe.val())
  return Glcss.Card(
    Glcss.CardHeader('Equipment'),
    Layout.UL('Weapon', 'Armor', 'Mark', 'Prop')
  )
}