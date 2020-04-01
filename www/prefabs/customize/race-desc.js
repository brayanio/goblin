import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'
import Data from '../../../data/module.js'
import CHPipe from '../../pipes/custom-hero.js'

export default () => Layout.DataObj(CHPipe.Hero.race, race => 
  Glcss.Card(
    Glcss.CardHeader(race.name),
    Layout.Container('div', ['race-desc'], 
      Data.RaceDescriptions[race.name]
    )
  )
)