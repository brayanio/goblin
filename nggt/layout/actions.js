import nggt from '../nggt.js'
const

Auto = (template, auto) => nggt.create({template, auto}),

Btn = (classlist, inner, fn) => nggt.create({
  template: `<button type="button" class="${classlist.join(' ')}" id="btn">${inner}</button>`,
  run: ui => ui.btn.addEventListener('click', e => fn(e))
}),

BtnAuto = (classlist, inner, fn) => nggt.create({
  template: `<button type="button" class="${classlist.join(' ')}" id="btn">${inner}</button>`,
  auto: ui => ui.btn.addEventListener('click', e => fn(e))
}),

Clickable = (el, classlist, inner, fn) => nggt.create({
  template: `<${el} class="${classlist.join(' ')}" id="clickable">${inner}</${el}>`,
  run: ui => ui.clickable.addEventListener('click', e => fn(e))
})

export default { Auto, Btn, BtnAuto, Clickable }