import nggt from '../../nggt.js'
import Icon from './icon.js'

export default (el, classlist, inner, fn) => nggt.create({
  template: `<${el} class="${classlist.join(' ')}" id="clickable">${inner}</${el}>`,
  run: ui => ui.clickable.addEventListener('click', e => fn(e))
})