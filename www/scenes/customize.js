import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import Data from '../../../data/module.js'

export default () => {
  let hero = nggt.pipe('name', {'race': Data.Races[0]}),
    equipment = nggt.pipe(...Data.ItemSlots),
    stats = nggt.pipe({
      total: 12,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      charisma: 0
    })

  const character = () => {
    return {
      ...hero.val(),
      stats: stats.val(),
      equipment: equipment.val()
    }
  }

  return nggt.create({
    isRoot: true,
    classList: ['customize', 'gl-scene_mobile'],
    template: Prefabs.Container('div', [],
      Prefabs.Card(
        Prefabs.ColGrid(0, 10,
          Prefabs.Join(
            Prefabs.HeroForm(hero),
            Prefabs.HeroStats(stats)
          ),
          Prefabs.Join(
            Prefabs.RaceDesc(hero.race),
            Prefabs.HeroEquipment(equipment)
          )
        ),
        Prefabs.HeroStore(hero, stats, equipment),
        Prefabs.Container('div', ['right'],
          Prefabs.Btn(['gl-btn_icon'], 'Create', () => console.log(character()))
        )
      )
    ),
    run: (ui) => {
      
    },
    cleanup: () => {
      stats.cleanup()
    }
  })
}