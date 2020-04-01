import Layout from '../layout/module.js'

export default (...text) => 
Layout.Container('button', ['gl-btn_icon'],
  ...text
)