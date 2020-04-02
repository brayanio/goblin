import Create from './nggt/create.js'
import Router from './nggt/router.js'
import service from './nggt/service.js'
import dataObj from './nggt/data-obj.js'
import pipe from './nggt/pipe.js'

let core = dataObj({
  root: null,
  currentRoute: null, 
  cleanupAr: [], 
  runAr: [], 
  cache: dataObj({})
})

let router = Router(core)
let create = Create(core)

export default { router, create, service, dataObj, pipe }