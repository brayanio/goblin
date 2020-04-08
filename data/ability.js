const AbilityTypes = ['Hit', 'Miss', 'Blocked', 'EnemyHit', 'EnemyMiss', 'TurnStart', 'TurnEnd']
let AbilityType = {}
AbilityTypes.forEach(i => AbilityType[i] = i)

const Targets = ['Self', 'Ally', 'Allies', 'Enemy', 'Enemies']
let Target = {}
Targets.forEach(i => Target[i] = i)

const Ranges = ['None', 'Low', 'Medium', 'High', 'Ultra']
let Range = {}
Ranges.forEach(i => Range[i] = i)

const ability = (name, combat, active, desc) => {
  let obj = {name, desc}
  if(combat) obj.combat = combat
  if(active) obj.active = active
  return obj
}

const activeAbility = (name, cooldown, mana, ...actions) => desc => ability(name, null, {actions, cooldown, mana}, desc)
const combatAbility = (name, type, ...actions) => desc => ability(name, {type, actions}, null, desc)
//actions
const attack = (target, defendStat, rolls, die, bonusStat) => { return {attack: {defendStat, bonusStat, rolls, die}, target} }
const heal = (target, rolls, die, bonusStat) => { return {heal: {rolls, die, bonusStat}, target} }
const regen = (target, rolls, die, bonusStat) => { return {regen: {rolls, die, bonusStat}, target} }
const effect = (target, name, duration, ...actions) => { return {effect: {name, duration, actions}, target} }
const buff = (target, name, duration, stats, combat) => { return {buff: {name, duration, stats, combat}, target} }
const debuff = (target, name, duration, defendStat, bonusStat, stats, combat) => { return {buff: {name, duration, stats, combat}, target, debuff: true} }
const custom = (target, str) => { return {custom: str, target} }

const Abilities = [
  // weapons
  combatAbility('Counter', AbilityType.EnemyMiss, attack(Target.Enemy, 'dexterity', 1, 8, null))('On Enemy Miss - roll an Attack vs Dexterity to deal 1d8 damage.'),
  combatAbility('Headshot', AbilityType.Hit, buff(Target.Self, 'Headshot', null, null, {critDamage: 300}))('Critical hits deal x3 damage.'),
  combatAbility('Drain', AbilityType.Hit, buff(Target.Self, 'Headshot', 1, {strength: 1}, null))('On Hit gain 1 strength for 2 turns'),
  combatAbility('Chainsaw', AbilityType.Hit, attack(Target.Enemy, 'strength', 2, 4, null))('On Hit - roll an Attack vs Strength to deal 2d4 damage.'),
  combatAbility('Burn', AbilityType.Hit, attack(Target.Enemy, 'dexterity', 2, 4, null))('On Hit - roll an Attack vs Dexterity to deal 2d4 damage.'),
  combatAbility('Melt', AbilityType.Hit, attack(Target.Enemy, 'dexterity', 1, 8, null))('On Hit - roll an Attack vs Dexterity to deal 1d8 damage.'),
  combatAbility('Acid Spit', AbilityType.Hit, attack(Target.Enemy, 'dexterity', 2, 4, null))('On Hit - roll an Attack vs Dexterity to deal 2d4 damage.'),
  combatAbility('Hope', AbilityType.Blocked, heal(Target.Self, 1, 4, null))('On Blocked - Heal 1d4 damage.'),
  combatAbility('Searing Pain', AbilityType.Blocked, attack(Target.Enemy, 'charisma', 1, 12, null))('On Blocked - roll an Attack vs Charisma to deal 1d12 damage.'),
  combatAbility('Tear', AbilityType.EnemyHit, attack(Target.Enemy, 'dexterity', 1, 8, null))('On Enemy Hit - roll an Attack vs dexterity to deal 1d8 damage.'),
  // props
  activeAbility('Pounce', Range.Medium, Range.Medium, attack(Target.Enemy, 'dexterity', 3, 8, 'dexterity'))('Attack vs Dexterity to deal 3d8 + dex damage.'),
  activeAbility('Iron Clamp', Range.Medium, Range.Medium, attack(Target.Enemy, 'strength', 3, 8, 'strength'))('Attack vs Strength to deal 3d8 + str damage.'),
  activeAbility('Domination', Range.High, Range.Ultra, attack(Target.Enemy, 'strength', 5, 12, 'strength'))('Attack vs Strength to deal 5d12 + str damage.'),
  activeAbility('Havoc Harmony', Range.High, Range.High, attack(Target.Enemy, 'dexterity', 6, 6, 'dexterity'))('Attack vs Dexterity to deal 6d6 + dex damage.'),
  activeAbility('Energize', Range.Medium, Range.None, regen(Target.Self, 2, 12, null))('Restore 2d12 mana.'),
  activeAbility('Acid Siege', Range.Ultra, Range.Ultra, attack(Target.Enemy, 'strength', 8, 10, 'strength'))('Attack vs Strength to deal 8d10 + str damage.'),
  activeAbility('Stun', Range.Meidum, Range.High, debuff(Target.Enemy, 'Stunned', 3, 'charisma', null,{strength: 4, dexterity: 4, intelligence: 4, charisma: 4}, null))('Attack vs Charisma to reduce enemy stats by 4 for 3 turns.'),
  activeAbility('Multi Attack', Range.Meidum, Range.Meidum, attack(Target.Enemies, 'dexterity', 2, 8, 'dexterity'))('Attack vs Dexterity to deal 2d8 + dex damage.'),
  // trinkets
  activeAbility('Restore', Range.Low, Range.Low, heal(Target.Allies, 1, 6, null))('Heal allies for 1d6 hitpoints'),
  activeAbility('Truesight', Range.None, Range.Low, buff(Target.Self, 'Truesight', 4, {intelligence: 2}, null))('Increase Intelligence by 2 for 4 turns.'),
  activeAbility('Horrify', Range.High, Range.High, debuff(Target.Enemy, 'Horrified', 3, 'charisma', null, {strength: 2, dexterity: 2, intelligence: 2, charisma: 2}, null))('Attack vs Charisma to reduce enemy stats by 2 for 4 turns.'),
  activeAbility('Blessing', Range.Low, Range.Low, heal(Target.Ally, 1, 12, null), custom(Target.Ally, 'remove_debuffs'))('Heal target for 1d12 and remove debuffs.'),
  activeAbility('Scarab Swarm', Range.Meidum, Range.Meidum, attack(Target.Enemies, 'dexterity', 4, 4, 'dexterity'))('Attack vs Dexterity to deal 4d4 + dex damage.'),
  combatAbility('Acid Reflect', AbilityType.EnemyHit, attack(Target.Enemy, 'dexterity', 2, 10, 'dexterity'))('On Enemy Hit - roll an Attack vs Dexterity to deal 2d10 + dex damage.'),
  combatAbility('Regenerate', AbilityType.TurnStart, heal(Target.Allies, 1, 4, null))('On Turn Start - allies heal for 1d4'),
  activeAbility('Ascend', Range.Medium, Range.Low, buff(Target.Self, 'Ascended', 1, {strength: 4, intelligence: 4, dexterity: 4, charisma: 4}, {ac: 4}))('Increase Armor Class and Stats by 4 for 1 turn.')
]
let Ability = {}
Abilities.forEach(i => Ability[i.name.split(' ').join('')] = i)

let exportObj = {Abilities, Ability, AbilityType, AbilityTypes}

export default exportObj