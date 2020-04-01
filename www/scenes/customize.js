import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import CustomHeroPipe from '../pipes/custom-hero.js'

export default () => nggt.create({
  isRoot: true,
  classList: ['customize', 'gl-scene_mobile'],
  template: Prefabs.Card(
    Prefabs.ColGrid(0, 10,
      Prefabs.HeroForm() + Prefabs.HeroStats(),
      Prefabs.RaceDesc() + Prefabs.HeroEquipment()
    ),
    Prefabs.HeroStore(),
    Prefabs.Container('div', ['right'],
      Prefabs.Btn(['gl-btn_icon'], 'Create', () => console.log(CustomHeroPipe.val()))
    )
  ),
  cleanup: () => CustomHeroPipe.cleanup()
})