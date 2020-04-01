import nggt from '../../nggt.js'
import Gbln from '../gbln/module.js'
import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'

import Data from '../../../data/module.js'

const calcTotal = (pipe) => {
  let s = pipe.val()
  pipe.total.change(12 - s.strength - s.dexterity - s.intelligence - s.charisma)
}

export default (pipe) => { // total, strength, dexterity, intelligence, charisma
  let subs = [
    pipe.strength.onChange(() => calcTotal(pipe)),
    pipe.dexterity.onChange(() => calcTotal(pipe)),
    pipe.intelligence.onChange(() => calcTotal(pipe)),
    pipe.charisma.onChange(() => calcTotal(pipe))
  ]
  pipe.fn('cleanup', () => subs.forEach(sub => sub.cleanup()))

  return Glcss.Card(
    Glcss.CardHeader(
      Layout.DataObj(pipe.total, statPoints => 
        Layout.El('span', `Stat Points: ${statPoints}`)
      )
    ),
    Gbln.Quantity('Strength', pipe.strength, pipe.total),
    Gbln.Quantity('Dexterity', pipe.dexterity, pipe.total),
    Gbln.Quantity('Intelligence', pipe.intelligence, pipe.total),
    Gbln.Quantity('Charisma', pipe.charisma, pipe.total)
  )
}