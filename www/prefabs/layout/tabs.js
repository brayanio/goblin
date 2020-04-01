import nggt from '../../nggt.js'
import El from './el.js'

export default (dataObj, ...tabs) => {
  let sub
  return nggt.create({
    template: El('div', ...tabs),
    run: ui => sub = dataObj.onChange(t => {
      if(ui[t]){
        Object.values(ui).forEach(tab => tab.classList.add('hidden'))
        ui[t].classList.remove('hidden')
      }
    }),
    cleanup: () => sub.cleanup()
  })
}