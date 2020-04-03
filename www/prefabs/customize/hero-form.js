import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'

const Hero = CustomHeroPipe.Hero
export default title => Layout.Card( //name, race, fn
  Layout.CardHeader(title),
  Layout.Container('form', ['gl-card'],
    Layout.FormInput('Name', {}, Hero.name),
    Layout.FormSelect('Race', Data.RaceNames, Hero.race, r => Data.Race[r])
  )
)