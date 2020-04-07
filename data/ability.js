const AbilityTypes = ['Hit', 'Miss', 'Blocked', 'EnemyHit', 'EnemyMiss', 'TurnStart', 'TurnEnd']
let AbilityType = {}
AbilityTypes.forEach(i => AbilityType[i] = i)

const Targets = ['Self', 'Allies', 'Enemy', 'Enemies']
let Target = {}
Targets.forEach(i => Target[i] = i)

const Ranges = ['None', 'Low', 'Medium', 'High', 'Ultra']
let Range = {}
Ranges.forEach(i => Range[i] = i)

const ability = (name, type, desc) => {
  return {name, desc, combat: {type}}
}

const active = (name, target, cooldown, mana, desc) => {
  return {name, desc, active: {target, cooldown, mana}}
}

const Abilities = [
  // weapons
  ability('Counter', AbilityType.EnemyMissed, 'On Enemy Miss - roll an attack vs Dexterity to deal 1d8 damage.'),
  ability('Headshot', AbilityType.Hit, 'On Hit with attack rolls greater than 18 - deal double damage.'),
  ability('Life Drain', AbilityType.Hit, 'On Hit with attack rolls greater than 18 - heal for the amount of damage dealt.'),
  ability('Chainsaw', AbilityType.Hit, 'On Hit - roll an attack vs Strength to deal 1d4 damage.'),
  ability('Burn', AbilityType.Hit, 'On Hit - roll an attack vs Dexterity to deal 1d4 damage.'),
  ability('Melt', AbilityType.Hit, 'On Hit - roll an attack vs Dexterity to deal 1d8 damage.'),
  ability('Acid Spit', AbilityType.Hit, 'On Hit - roll an attack vs Dexterity to deal 1d4 damage.'),
  ability('Hope', AbilityType.Blocked, 'On Blocked - heal 1d4 damage.'),
  ability('Searing Pain', AbilityType.Blocked, 'On Blocked - roll an attack vs Charisma to deal 1d12 damage.'),
  ability('Tear', AbilityType.EnemyHit, 'On Enemy Hit - roll an attack vs dexterity to deal 1d8 damage.'),
  // props
  active('Pounce', Target.Enemy, Range.Medium, Range.Medium, 'Attack vs Dexterity to deal 3d8 + dex damage.'),
  active('Iron Clamp', Target.Enemy, Range.Medium, Range.Medium, 'Attack vs Strength to deal 3d8 + str damage.'),
  active('Domination', Target.Enemy, Range.High, Range.Ultra, 'Attack vs Strength to deal 5d12 + str damage.'),
  active('Havoc Harmony', Target.Enemies, Range.High, Range.High, 'Attack vs Dexterity to deal 6d6 + dex damage.'),
  active('Energize', Target.Self, Range.Medium, Range.None, 'Restore 4d12 mana.'),
  active('Acid Siege', Target.Enemy, Range.Ultra, Range.Ultra, 'Attack vs Strength to deal 8d10 + str damage.'),
  active('Stun', Target.Enemy, Range.Meidum, Range.High, 'Reduce enemy stats by 4 for 2 turns.'),
  active('Multi Attack', Target.Enemies, Range.Meidum, Range.Medium, 'Attack vs Dexterity to deal 2d8 + dex damage.'),
  // trinkets
  active('Restore', Target.Allies, Range.Low, Range.Low, 'Heal for 1d6 hitpoints'),
  active('Truesight', Target.Self, Range.None, Range.Low, 'Increase Intelligence by 2 for 3 turns.'),
  active('Horrify', Target.Enemy, Range.High, Range.High, 'Attack vs Charisma to reduce enemy stats by 2 for 3 turns.'),
  active('Blessing', Target.Allies, Range.Medium, Range.Medium, 'Heal for 1d12 and remove debuffs.'),
  active('Scarab Swarm', Target.Enemies, Range.Medium, Range.Medium, 'Attack vs Dexterity to deal 6d4 + dex damage.'),
  ability('Acid Reflect', AbilityType.EnemyHit, 'On Enemy Hit - roll an Attack vs Dexterity to deal 2d10 + dex damage.'),
  ability('Regenerate', AbilityType.TurnStart, 'On Turn Start - allies heal for 1d4'),
  active('Ascend', Target.Self, Range.Medium, Range.Low, 'Increase Armor Class and Stats by 4 for 1 turn.')
]
let Ability = {}
Abilities.forEach(i => Ability[i.name.split(' ').join('')] = i)

let exportObj = {Abilities, Ability, AbilityType, AbilityTypes}

export default exportObj