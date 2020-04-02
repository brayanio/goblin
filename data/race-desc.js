const desc = (intro, apperance, tags, governance, origin) => `
  ${intro}
  <hr>
  <i>Apperance</i>
  ${apperance}
  <hr>
  <i>Tags</i>
  ${tags}
  <hr>
  <i>Governance</i>
  ${governance}
  <hr>
  <i>Origins</i>
  ${origin}
`

export default {
  Elf: desc(
    `By far the most prosperious race on Pandora is the Elves. Their race has attuned closely with the planet and have gained casual mastery of simple magics.`,
    `Tall and slender, Elves are very dexterious, often opting for mobility in battle. Elves separate into subraces and each have color variation. Each elf ages very slowly and they're known to live up to a thousand years.`,
    `
      Elves are <strong>Humanoid</strong> and <strong>Divine</strong> because of their conservation of a positive moral religion.
    `,
    `Elves live in countries and form subraces. Each subrace is ruled by a councils of eldars. Elves can share a telepathic connection with other elves at will. Because of this, they are typically friendly to foriegn Elves and are very communal.`,
    `Elves are native to Pandora and are an integral part of the planet.`
  ),
  Dwarf: desc(
    `Dwarves are a race of intelligent inventors, relying on technology to protect their strongholds.`,
    `With growing threats, large splits in the dwarvern culture rely on technology excessivly. This created two factions, the inventors and the traditionalists.`,
    `
      Dwarves are considered <strong>Humanoid</strong> and <strong>Divine</strong> because of their conservation of a positive moral religion.
    `,
    `Dwarves live in strongholds and uphold high value to currency. Kingship is often transfered to the highest bidder while High Clerics have the responsibility of upholding population morals.`,
    `Anywhere you can find a mountain, precious gems, or metals you can find a Dwarf. Their culture heavily revolves around material worship.`
  ),
  Orc: desc(
    `Orcs are forieners to Pandora. They're original planet was conquered by the Tiefling and consumed by the Nether.`,
    `Orcs are muscular and athletic brutes. Orcs have green or pale-green skin and small lower jaw tusks. Female orcs have less differences to male orcs than usual humanoid races.`,
    `
      Orcs are considered <strong>Humanoid</strong> and <strong>Evil</strong> because of their conservation of a negative moral religion. 
    `,
    `Orcs live in small tribes and choose to not live in strongholds. Orcs are ruled by the strongest orc.`,
    `Orcs are nomadic and live in all environments. They form tribes and rarely allow outsiders. Orcs are prone to war when encountering elves.`
  ),
  Tiefling: desc(
    `Tieflings are invadors to Pandora. They are humanoid cross-breeds of devils and divine humanoids.`,
    `Tieflings are muscular and athletic brutes, slightly thicker than orcs. All Tieflings have two signature curved horns on their skull and unique beard horn varients.`,
    `
      Tieflings are considered <strong>Humanoid</strong>, <strong>Devilkin</strong>, because of their devil bloodline and <strong>Evil</strong> because of their conservation of a negative moral religion. 
    `,
    `Tieflings live in complex heirarchies based on "demoting" a sinful being's soul known as soul demotion. The further the soul is pushed toward sin, the lower the soul's vibration. When vibration is dangerously low or high, power manifests in unpredictable ways. <br>
    Devils are created in the Nether when a divine being dies and their soul vibration is critically low.`,
    `Tieflings can be found deep within mountains or volcanos. Their strongholds usually have portals to larger cities in the Nether.`
  ),
  Druidic: desc(
    `Druidic creatures are native guardians of Pandora.`,
    `Druidic creatures are the reincarnation of powerful elven spirits that have been chosen to guard Pandora. They take the shape of a regular animal but with divine augments.`,
    `
      Druidic creatures are considered a <strong>Creature</strong> and <strong>Divine</strong> because of their divine creation. 
    `,
    `Druidic creatues can form herds. Usually these are non-hierarchal and non-species specific. Because of this, usually Druidic herds can bring abundances of nature and growth. Druidic creatures are divine by nature and can sense divine beings. They are passive towards non-hostile divine beings.`,
    `Druidic creatures can be found all over Pandora.`
  ),
  Golem: desc(
    `Golems are crafted steampunk guardians of Dwarves.`,
    `Golems are large complex steampunk blueprints that take many months and dwarves to create. Golems are created in the image of Large Dwarf Avatars or Druidic creatures but take advantage of technological augments.`,
    `
      Golems are considered a <strong>Contruct</strong>.
    `,
    `Golems are created with divine blessings and arcane sentience. Golems are bound by arcane sentience to their creators. The blessings given to the Golem upon creation give the golem its "personality". But because it is an arcane creation, it has no soul and can only act through its personality. <br>
    Some golems are able to hold the souls of strong spirited Dwarves via an ancient and dangerous ressurection ritual.`,
    `Golems can be found protecting the mountain tunnels of the Dwarves from Tiefling.`
  ),
  Daemonic: desc(
    `Daemonic creatures are spawns of the Nether introduced by Tieflings.`,
    `Daemonic creatures are manifestations of sinful essense and nightmares.`,
    `
      Daemonic creatures are considered a <strong>Creature</strong> and <strong>Evil</strong> because of their evil creation and temperment. 
    `,
    `Daemonic creatures and most daemon are ruled by Devils. Daemons are also capible of soul demotion. Daemons are naturally created in the Nether when evil beings with low soul vibration die.`,
    `
      Daemonic creatures are summoned into Pandora via Tiefling acolytes. <br>
      Tiefling zealots and acolytes can harness sinful essense expelled from divine beings. They do this by casting spells of mass madness or by engaging in the act of war.
    `
  ),
  Spawn: desc(//intro, appearance, global presence, tags, governance
    `Spawn are beings born on the contenient Pandemonium through chaotic energy.`,
    `Spawn are truly random creatures with chaotic augments. Examples of Spawn are Manticores, Medusas, `,
    `
      Spawn are considered a <strong>Creature</strong> and <strong>Chaotic</strong> because of their chaotic creation and temperment.
    `,
    `Spawn are created by neutral-aligned or redeemed evil-aligned divine souls reincarnating. They are born as a random aspect of the Pandora world spirit manifested into a creature. Spawn are neutral in temperment but are usually violent because everything in Pandemonium is dangerous.`,
    `Spawn live on Pandemonium and rarely spread to other contenients due to the harsh conditions of Pandemonium.`
  )
}