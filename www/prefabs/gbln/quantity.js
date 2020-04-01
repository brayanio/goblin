import nggt from '../../nggt.js'
import Layout from '../layout/module.js'
import CustomHeroPipe from '../../pipes/custom-hero.js'

const click = (obj, inc) => 
  (inc === 1 && CustomHeroPipe.Stats.total.val() > 0) || (inc === -1 && obj.val() > 0)
  ? obj.change(obj.val() + inc) : null
const cap = s => s.substr(0, 1).toUpperCase() + s.substr(1)

export default (label) => {
  const obj = CustomHeroPipe.Stats[label]
  return Layout.Container('div', ['gbln-quantity'], 
    Layout.El('span', cap(label)),
    Layout.DataObj(obj, val => 
      Layout.Bold(val)
    ),
    Layout.Btn(['gl-btn_icon'], '+', () => click(obj, 1)),
    Layout.Btn(['gl-btn_icon'], '-', () => click(obj, -1))
  )
}