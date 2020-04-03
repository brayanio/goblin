import nggt from '../../../nggt/nggt.js'
import Data from '../../../data/module.js'
import CHPipe from '../../pipes/custom-hero.js'

import Layout from '../gl-layout.js'

const ExamplePanel = (header, ...ar) => Layout.Card(
  Layout.CardHeader(header),
  ...ar.map(t => Layout.AutoBtn(['gl-btn_icon'], t.name, () => CHPipe.Equipment[t.type.slot].change(t)))
)

const StorePanel = (slot, tags) => {
  let items = Data.getItemsBySlotByTags(slot, tags)
  if(items)
    return Layout.Join(...Object.keys(items).map(category => ExamplePanel(category, ...items[category])))
  return ''
}

export default () => {
  const tabs = nggt.dataObj(Data.ItemSlots[0])
  return Layout.Panel(
    Layout.PanelHeader(
      Layout.Container('div', ['space-between'],
        'Outfit',
        Layout.FormSelect(null, Data.ItemSlots, tabs)
      )
    ),
    Layout.Tabs(tabs, Layout.Map(Data.ItemSlots, slot => 
      Layout.Tab(slot,
        Layout.DataObj(CHPipe.Hero.race, race => 
          StorePanel(slot, race.tags)
        )
      )
    ))
  )
}