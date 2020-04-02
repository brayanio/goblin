import nggt from '../../nggt.js'
import Layout from '../gl-layout.js'
import Data from '../../../data/module.js'
import CHPipe from '../../pipes/custom-hero.js'

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

const tabs = nggt.dataObj(Data.ItemSlots[0])
export default () => Layout.Panel(
  Layout.PanelHeader(
    Layout.Container('div', ['space-between'],
      'Store',
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