import Layout from '../gl-layout.js'

export default (key, ...value) => Layout.Container('div', ['gbln-keyvalue'], 
  Layout.El('span', key),
  ...value
)