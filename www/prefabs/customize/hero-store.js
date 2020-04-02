import nggt from '../../nggt.js'
import Glcss from '../glcss/module.js'
import Layout from '../layout/module.js'
import Data from '../../../data/module.js'
import CHPipe from '../../pipes/custom-hero.js'

const ExamplePanel = (header, ...ar) => Glcss.Card(
  Glcss.CardHeader(header),
  ...ar.map(t => Glcss.AutoBtn(['gl-btn_icon'], t.name, () => CHPipe.Equipment[t.type.slot].change(t)))
)

const StorePanel = (slot, tags) => {
  let items = Data.getItemsBySlotByTags(slot, tags)
  if(items)
    return Layout.Join(...Object.keys(items).map(category => ExamplePanel(category, ...items[category])))
  return ''
}

const tabs = nggt.dataObj(Data.ItemSlots[0])
export default () => Glcss.Panel(
  Glcss.PanelHeader(
    Layout.Container('div', ['space-between'],
      'Store',
      Glcss.FormSelect(null, Data.ItemSlots, tab => tabs.change(tab))
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