import Layout from '../gl-layout.js'
import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

const Hero = CustomHeroPipe.Hero
export default () => Layout.Card( //name, race, fn
  Layout.CardHeader('Create Character'),
  Layout.Container('form', ['gl-card'],
    Layout.FormInput('Name', {}, Hero.name),
    Layout.FormSelect('Race', Data.RaceNames, Hero.race, r => Data.Race[r])
  )
)