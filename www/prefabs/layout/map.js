export default (ar, fn) => ar.map((e, i) => fn(e, i)).join('')