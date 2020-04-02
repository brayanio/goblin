import Data from '../../../data/module.js'
import CHPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'

export default () => Layout.DataObj(CHPipe.Hero.race, race => 
  Layout.Panel(
    Layout.PanelHeader(race.name + ' Description'),
    Layout.Container('div', ['race-desc'], 
      Data.RaceDescriptions[race.name]
    )
  )
)