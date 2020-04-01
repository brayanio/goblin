import nggt from '../../nggt.js'
import Layout from '../layout/module.js'

export default (label, obj, totalObj) => {
  obj = obj || nggt.dataObj(0)

  const click = inc => {
    const val = obj.val(), total = totalObj.val()
    if((inc === 1 && total > 0) || (inc === -1 && val > 0)) 
      obj.change(obj.val() + inc)
  }

  return Layout.Container('div', ['gbln-quantity'], 
    Layout.El('span', label),
    Layout.DataObj(obj, val => 
      Layout.Bold(val)
    ),
    Layout.Btn(['gl-btn_icon'], '+', () => click(1)),
    Layout.Btn(['gl-btn_icon'], '-', () => click(-1))
  )
}