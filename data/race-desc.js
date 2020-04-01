const desc = (intro, apperance, globalPresence, tags, governance) => `
  ${intro}
  <hr>
  <i>Apperance</i>
  <br>
  ${apperance}
  <hr>
  <i>Global Presence</i>
  <br>
  ${globalPresence}
  <hr>
  <i>Tags</i>
  <br>
  ${tags}
  <hr>
  <i>Governance</i>
  <br>
  ${governance}
`

export default {
  Elf: desc(
    `Elves are the most prosperious race on Pandora.`,
    `Elves are slender and tall in stature. Elves are light-tan with a tent of any color (Color tent isn't a unique pattern, rather a subracial trait). They're known to live up to a thousand years.`,
    `Elves harnesses magic from the lifeforce of the planet. Because of this, they integrate the nature of their environment into their architecture.`,
    `
      Elves are considered <strong>Humanoid</strong>. <br>
      Elves are considered <strong>Divine</strong> because of their conservation of a positive moral religion.
    `,
    `Elves live in countries. They're ruled by a council of the 13 oldest elders. Elves can share a telepathic connection with other elves at will. Because of this, they are typically friendly to foriegn Elves and are very communal.`
  ),
  Dwarf: desc(
    `Dwarves are the inventors of Pandora, relying on technology to protect their strongholds.`,
    `Dwarves are short and stout. Although strong for their size, they still rely on their technology or faith in combat.`,
    `Dwarves live in mountains and use the metal and gems of the land throughout their culture.`,
    `
      Dwarves are considered <strong>Humanoid</strong>. <br>
      Dwarves are considered <strong>Divine</strong> because of their conservation of a positive moral religion.
    `,
    `Dwarves live in patriarchcal hierarchal monarchies. The wisest or most cunning Dwarf is usually elected king until the people choose a new king.`
  ),
  Orc: desc(
    `Orcs are forieners to Pandora. They're original planet was conquered by the Tiefling and consumed by the Nether.`,
    `Orcs are muscular and athletic brutes, slightly thicker than elves. Orcs have green or pale-green skin and small lower jaw tusks. Female orcs have less differences to male orcs than usual humanoid races.`,
    `Orcs are nomadic and live in all environments. They form tribes and rarely allow outsiders. Orcs are prone to war when encountering elves.`,
    `
      Orcs are considered <strong>Humanoid</strong>. <br>
      Orcs are considered <strong>Evil</strong> because of their conservation of a negative moral religion. 
    `,
    `Orcs live in small tribes and choose to not live in strongholds. Orcs are ruled by the strongest orc.`
  ),
  Tiefling: desc(
    `Tieflings are invadors to Pandora. They are humanoid cross-breeds of devils and divine humanoids.`,
    `Tieflings are muscular and athletic brutes, slightly thicker than orcs. All Tieflings have two signature curved horns on their skull and unique beard horn varients.`,
    `Tieflings can be found deep within mountains or volcanos. Their strongholds usually have portals to larger cities in the Nether.`,
    `
      Tieflings are considered <strong>Humanoid</strong>. <br>
      Tieflings are considered <strong>Evil</strong> because of their conservation of a negative moral religion. <br>
      Tieflings are considered <strong>Devilkin</strong> because of their devil bloodline.
    `,
    `Tieflings live in complex heirarchies based on "demoting" a sinful being's soul known as soul demotion. The further the soul is pushed toward sin, the lower the soul's vibration. When vibration is dangerously low or high, power manifests in unpredictable ways. <br>
    Devils are created in the Nether when a divine being dies and their soul vibration is critically low.`
  ),
  Druidic: desc(
    `Druidic creatures are native guardians of Pandora.`,
    `Druidic creatures are the reincarnation of powerful elven spirits that have been chosen to guard Pandora. They take the shape of a regular animal but with divine augments.`,
    `Druidic creatures can be found all over Pandora.`,
    `
      Druidic creatures are considered a <strong>Creature</strong>. <br> 
      Druidic creatures are considered <strong>Divine</strong> because of their divine creation. 
    `,
    `Druidic creatues can form herds. Usually these are non-hierarchal and non-species specific. Because of this, usually Druidic herds can bring abundances of nature and growth. Druidic creatures are divine by nature and can sense divine beings. They are passive towards non-hostile divine beings.`
  ),
  Golem: desc(
    `Golems are crafted steampunk guardians of Dwarves.`,
    `Golems are large complex steampunk blueprints that take many months and dwarves to create. Golems are created in the image of Large Dwarf Avatars or Druidic creatures but take advantage of technological augments.`,
    `Golems can be found protecting the mountain tunnels of the Dwarves from Tiefling.`,
    `
      Golems are considered a <strong>Contruct</strong>.
    `,
    `Golems are created with divine blessings and arcane sentience. Golems are bound by arcane sentience to their creators. The blessings given to the Golem upon creation give the golem its "personality". But because it is an arcane creation, it has no soul and can only act through its personality. <br>
    Some golems are able to hold the souls of strong spirited Dwarves via an ancient and dangerous ressurection ritual.`
  ),
  Daemonic: desc(
    `Daemonic creatures are spawns of the Nether introduced by Tieflings.`,
    `Daemonic creatures are manifestations of sinful essense and nightmares.`,
    `
      Daemonic creatures are summoned into Pandora via Tiefling acolytes. <br>
      Tiefling zealots and acolytes can harness sinful essense expelled from divine beings. They do this by casting spells of mass madness or by engaging in the act of war.
    `,
    `
      Daemonic creatures are considered a <strong>Creature</strong>. <br>
      Daemonic creatures are considered <strong>Evil</strong> because of their evil creation and temperment. 
    `,
    `Daemonic creatures and most daemon are ruled by Devils. Daemons are also capible of soul demotion. Daemons are naturally created in the Nether when evil beings with low soul vibration die.`
  ),
  Spawn: desc(
    `Spawn are beings born on the contenient Pandemonium through chaotic energy.`,
    `Spawn are truly random creatures with chaotic augments.`,
    `Spawn live on Pandemonium and rarely spread to other contenients due to the harsh conditions of Pandemonium.`,
    `
      Spawn are considered a <strong>Creature</strong>.
      Spawn are considered <strong>Chaotic</strong> because of their chaotic creation and temperment.
    `,
    `Spawn are created by neutral-aligned or redeemed evil-aligned divine souls reincarnating. They are born as a random aspect of the Pandora world spirit manifested into a creature. Spawn are neutral in temperment but are usually violent because everything in Pandemonium is dangerous.`
  )
}