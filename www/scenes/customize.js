import nggt from '../nggt.js'
import Prefabs from '../prefabs/customize.js'
import CustomHeroPipe from '../pipes/custom-hero.js'

const tab = nggt.dataObj('step1')
export default () => nggt.create({
  isRoot: true,
  classList: ['customize', 'gl-scene_mobile_pro'],
  template: Prefabs.Tabs(tab,
    Prefabs.Tab('step1',
      Prefabs.Card(
        Prefabs.ColGrid(0, 10,
          Prefabs.HeroForm() + Prefabs.HeroStats(),
          Prefabs.RaceDesc()
        ),
        Prefabs.Container('div', ['right'],
          Prefabs.Btn(['gl-btn_icon'], 'Equip', tab.onevent('step2'))
        )
      )
    ),
    Prefabs.Tab('step2',
      Prefabs.Card(
        Prefabs.ColGrid(0, 10,
          Prefabs.HeroForm() + Prefabs.HeroEquipment(),
          Prefabs.ItemInspect(),
        ),
        Prefabs.HeroStore(),
        Prefabs.Container('div', ['right'],
          Prefabs.Btn(['gl-btn_icon'], 'Back', tab.onevent('step1')),
          Prefabs.Btn(['gl-btn_icon'], 'Create', () => console.log(CustomHeroPipe.val()))
        )
      )
    )
  ),
  cleanup: () => CustomHeroPipe.cleanup()
})