import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'
import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

const Hero = CustomHeroPipe.Hero
export default () => Glcss.Card( //name, race, fn
  Glcss.CardHeader('Create Character'),
  Layout.Id('form', 'form', ['gl-card'],
    Glcss.FormInput('Name', {}, Hero.name),
    Glcss.FormSelect('Race', r => Hero.race.change(Data.Race[r]), Data.Races.map(r => 
      Glcss.FormOption(r.name)
    ))
  )
)