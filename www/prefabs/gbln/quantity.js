import nggt from '../../../nggt/nggt.js'
import Data from '../../../data/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'

const click = (obj, inc) => 
  (inc === 1 && CustomHeroPipe.Stats.total.val() > 0) || (inc === -1 && obj.val() > 0)
  ? obj.change(obj.val() + inc) : null

export default (label) => {
  const obj = CustomHeroPipe.Stats[label]
  return Layout.Container('div', ['gbln-quantity'], 
    Layout.El('span', Layout.cap(label)),
    Layout.DataObj(obj, val => 
      Layout.Bold(val)
    ),
    Layout.Btn(['gl-btn_icon'], '+', () => click(obj, 1)),
    Layout.Btn(['gl-btn_icon'], '-', () => click(obj, -1))
  )
}