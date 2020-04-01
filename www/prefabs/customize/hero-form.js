import nggt from '../../nggt.js'
import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'

import Data from '../../../data/module.js'

export default pipe => { //name, race, fn
  return Glcss.Card(
    Glcss.CardHeader('Create Character'),
    Layout.Id('form', 'form', ['gl-card'],
      Glcss.FormInput('Name', {}, pipe.name),
      Glcss.FormSelect('Race', r => pipe.race.change(Data.Race[r]), Data.Races.map(r => 
        Glcss.FormOption(r.name)
      ))
    )
  )
}