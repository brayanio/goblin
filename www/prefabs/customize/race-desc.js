import nggt from '../../nggt.js'
import Gbln from '../gbln/module.js'
import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'

import Data from '../../../data/module.js'

export default (obj) => Layout.DataObj(obj, race => 
  Glcss.Card(
    Glcss.CardHeader(race.name),
    Layout.Container('div', ['race-desc'], 
      Data.RaceDescriptions[race.name]
    )
  )
)