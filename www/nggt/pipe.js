import dataObj from './data-obj.js'

export default (...ar) => {
  let obj = {}, fns = []
  ar.forEach(o => {
    switch(typeof o){
      case 'object':
        Object.keys(o).forEach(key => {
          if(typeof o[key] === 'function')
            obj[key] = o[key]
          else
            obj[key] = dataObj(o[key])
        })
        break
      case 'string':
        obj[o] = dataObj(null)
        break
    }
  })

  const val = () => {
    let o = {}
    Object.keys(obj).forEach(key => {
      if(typeof obj[key] === 'object')
        o[key] = obj[key].val()
    })
    return o
  }
  const fnObj = dataObj({})
  const fn = (name, f) => fnObj.change(o => o[name] = f)

  let pipeRef = {val, fn, ...obj}
  pipeRef.sub = fnObj.onChange(o => {
    //clean
    fns.forEach(fn => delete pipeRef[fn])
    fns = []
    //add fn to pipe
    Object.keys(o).forEach(key => {
      pipeRef[key] = o[key]
      fns.push(key)
    })
  })

  return pipeRef
}