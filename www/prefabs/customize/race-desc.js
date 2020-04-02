import Layout from '../gl-layout.js'
import Data from '../../../data/module.js'
import CHPipe from '../../pipes/custom-hero.js'

export default () => Layout.DataObj(CHPipe.Hero.race, race => 
  Layout.Card(
    Layout.CardHeader(race.name),
    Layout.Container('div', ['race-desc'], 
      Data.RaceDescriptions[race.name]
    )
  )
)