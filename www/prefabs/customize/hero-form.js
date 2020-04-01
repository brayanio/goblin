import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'
import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

const Hero = CustomHeroPipe.Hero
export default () => Glcss.Card( //name, race, fn
  Glcss.CardHeader('Create Character'),
  Layout.Container('form', ['gl-card'],
    Glcss.FormInput('Name', {}, Hero.name),
    Glcss.FormSelect('Race', Data.RaceNames, r => Hero.race.change(Data.Race[r]))
  )
)