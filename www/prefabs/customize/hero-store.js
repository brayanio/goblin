import nggt from '../../nggt.js'
import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'

import Data from '../../../data/module.js'

export default (hero, stats, equipment) => {
  
  const ExamplePanel = (header, ...ar) => Glcss.Card(
    Glcss.CardHeader(header),
    ...ar.map(t => Glcss.AutoBtn(['gl-btn_icon'], t.name, () => equipment[t.type.slot].change(t)))
  )
  const StorePanel = (slot, tags) => {
    let items = Data.getItemsBySlotByTags(slot, tags)
    if(items)
      return Layout.Join(...items.map((item, i) => ExamplePanel(tags[i], ...item)))
    return ''
  }

  let tabs = nggt.dataObj(Data.ItemSlots[0])
  const mapItemSlot = fn => Data.ItemSlots.map(slot => fn(slot))
  return Glcss.Panel(
      Glcss.PanelHeader(
        Layout.Container('div', ['space-between'],
          'Store',
          Glcss.FormSelect(null, tab => tabs.change(tab), ...mapItemSlot(slot =>
            Glcss.FormOption(slot)
          ))
        )
      ),
      Layout.Tabs(tabs, ...mapItemSlot(slot => 
        Layout.Tab(slot,
          Layout.DataObj(hero.race, race => 
            StorePanel(slot, race.tags)
          )
        )
      ))
      
    )
}