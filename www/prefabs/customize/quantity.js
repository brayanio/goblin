import nggt from '../../../nggt/nggt.js'
import Data from '../../../data/module.js'
import CHPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'
import Gbln from '../gbln/module.js'

const click = (obj, inc) => 
  (inc === 1 && CHPipe.Stats.total.val() > 0) || (inc === -1 && obj.val() > 0)
  ? obj.change(obj.val() + inc) : null

const refresh = stat => {
  let statpoints = CHPipe.Stats[stat].val(), racial = 0, item = 0
  if(CHPipe.Hero.race.val())
    racial = CHPipe.Hero.race.val().stats[stat]
  Data.ItemSlots.forEach(slot => {
    if(CHPipe.Equipment[slot].val())
      if(CHPipe.Equipment[slot].val().stats && CHPipe.Equipment[slot].val().stats[stat])
        item += CHPipe.Equipment[slot].val().stats[stat]
  })
  return statpoints + racial + item
}

export default (label) => {
  const obj = CHPipe.Stats[label]
  let subs = []
  return nggt.create({
    template: Gbln.KeyValue(Layout.cap(label),
      // Layout.DataObj(obj, val => Layout.Bold(refresh(val))),
      Layout.Id('strong', label, [], 0),
      Layout.Container('div', ['right'],
        Layout.Btn(['gl-btn_icon'], '+', () => click(obj, 1)),
        Layout.Btn(['gl-btn_icon'], '-', () => click(obj, -1))
      )
    ),
    run: ui => {
      const ref = o => o.onChange(() => ui[label].innerText = refresh(label))
      subs = [
        ref(CHPipe.Hero.race),
        ref(obj),
        ...Data.ItemSlots.map(slot => ref(CHPipe.Equipment[slot])),
      ]
    },
    cleanup: () => subs.forEach(sub => sub.cleanup())
  })
}