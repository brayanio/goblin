const RaceTags = ['Humanoid', 'Divine', 'Evil', 'Devilkin', 'Construct', 'Creature', 'Daemon', 'Chaotic']
let RaceTag = {}
RaceTags.forEach(i => RaceTag[i] = i)

const race = (name, strength, dexterity, intelligence, charisma, tags) => {
  return {
    name,
    stats: {
      strength,
      dexterity,
      intelligence,
      charisma
    },
    tags
  }
}

let Races = [
  race('Elf', 0, 2, 0, 1, [RaceTag.Humanoid, RaceTag.Divine]),
  race('Dwarf', 0, 0, 2, 1, [RaceTag.Humanoid, RaceTag.Divine]),
  race('Tiefling', 2, 0, 0, 1, [RaceTag.Humanoid, RaceTag.Evil, RaceTag.Devilkin]),
  race('Orc', 2, 1, 0, 0, [RaceTag.Humanoid, RaceTag.Evil]),
  race('Golem', 2, 0, 1, 0, [RaceTag.Construct]),
  race('Druidic', 0, 2, 1, 0, [RaceTag.Creature, RaceTag.Divine]),
  race('Daemonic', 2, 1, -1, 1, [RaceTag.Creature, RaceTag.Daemon]),
  race('Spawn', 1, 1, 0, 1, [RaceTag.Creature, RaceTag.Chaotic])
]
let raceObj = {}, RaceNames = []
Races.forEach(r => {
  raceObj[r.name] = r
  RaceNames.push(r.name)
})

export default { 
  RaceTags, // [Humanoid, ...etc]
  RaceTag, // RaceTag.Humanoid

  Races, // [Elf, Dwarf, Tiefling, Orc, Golem, Druidic, Daemonic, Spawn]
  Race: raceObj, // Race.Elf
  RaceNames // [Elf]
}