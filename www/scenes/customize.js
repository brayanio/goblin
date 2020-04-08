import nggt from '../../../nggt/nggt.js'
import Data from '../../data/module.js'
import Prefabs from '../prefabs/customize.js'
import CustomHeroPipe from '../pipes/custom-hero.js'

export default () => {
  const tab = nggt.dataObj('step1')
  return nggt.create({
    isRoot: true,
    classList: ['customize', 'gl-scene_mobile_pro'],
    template: Prefabs.Card(
      Prefabs.ColGrid(0, 10, 10,
        Prefabs.HeroForm('Character Sheet') + Prefabs.HeroStats(),
        Prefabs.HeroRace() + Prefabs.HeroEquipment(),
        Prefabs.DataObj(CustomHeroPipe.selectedItem, i => 
          i && Prefabs.ItemInspect(i)
        )
      ),
      Prefabs.HeroStore(),
      Prefabs.Container('div', ['right'],
        Prefabs.Btn(['gl-btn_icon'], 'Back', tab.onevent('step1')),
        Prefabs.Btn(['gl-btn_icon'], 'Create', () => console.log(CustomHeroPipe.unit(), new Data.GameUnit(CustomHeroPipe.unit())))
      )
    ),
    cleanup: () => CustomHeroPipe.cleanup()
  })
}