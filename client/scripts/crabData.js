exports.backgrounds = [
    "Nature Sea",
    // done
    "earth_crystalcaveazure",
    "earth_crystalcaverainbow",
    "earth_emeraldforest",
    "earth_gardenOfEden",
    "earth_goldenGlade",

    "ocean_abysbioluminescence",
    "ocean_beach",
    "ocean_magicDeepSea",
    "ocean_natureSea",

    "science_furnacePlain",
    "science_lab",
    "science_starship",
    "science_steamApparat",

    "sky_happysnowfield",
    "sky_nightMountain",
    "sky_star",
    "sky_sunsetCliffs",

    "extras_africa",
    "extras_autofarm",
    "extras_vietnam",
    "extras_zed_run",
];
exports.bodies = [
    "Base Body",
    // done
    "basebody_1",
    "basebody_2",
    "basebody_3",
    "basebody_4",

    "metalbody_fire1",
    "metalbody_fire3",
    "metalbody_flame face red",
    "metalbody_laser eye",

    "snowbody_1",
    "snowbody_3",
    "snowbody_4",
    "snowbody_starbody",

    "woodbody_1",
    "woodbody_2",
    "woodbody_3",
    "woodbody_beastman",

    "extras_golden",
    "extras_diamond",
];
exports.claws = [
    "Sky Claw",
    // done
    "baseclaw_1",
    "baseclaw_2",
    "baseclaw_3",

    "metalclaw_lasergun",
    "metalclaw_pliers",
    "metalclaw_scissor",

    "snowclaw_1",
    "snowclaw_icycle",
    "snowclaw_skyclaw",

    "woodclaw_hammerlogs",
    "woodclaw_pincers",
    "woodclaw_spikeytendrils",
];
exports.legs = [
    "Base Leg",
    //done
    "baseleg_1",
    "baseleg_2",
    "baseleg_3",

    "metalleg_1",
    "metalleg_2",
    "metalleg_3",

    "snowleg_1",
    "snowleg_2",
    "snowleg_3",

    "woodleg_1",
    "woodleg_2",
    "woodleg_3",
];
exports.shells = [
    "starship",
    "Holy Temple",
    //done
    "baseshell_1",
    "baseshell_2",
    "baseshell_3",

    "alembic",
    "chimney",
    "Starship",

    "ice cube",
    "iceshell",
    "snowman",

    "woodshell_1",
    "carnivora",
    "runestone",

    "architect",
    "bee hive",
    "coral",
    "crystal",
    "diamond",
    "ethereum",
    "golden skull",

    "japan temple",
    "planter",
    "snail",
    "tentacles",
    "tesla coil",
    "tree cherry blossom",
    "tree green",
    "volcano",
];
exports.headpieces = [
    "crystal1",
    "crystal2",
    "crystal2-1",
    "crystal2-2",
    "crystal2-3",
    "crystal3",
    "crystal3-1",
    "crystal3-2",
    "crystal3-3",

    "fire1",
    "fire2",
    "fire3",

    "starfish1",
    "starfish2",
    "starfish3",
];
exports.getBackground = (backgroundSrc) => {
    for (let i = 0; i < this.backgrounds.length; i++) {
        if (backgroundSrc.includes(this.backgrounds[i])) {
            return this.backgrounds[i];
        }
    }
    console.error(`Background ${backgroundSrc} cannot be found.`);
};
exports.getShell = (src) => {
    for (let i = 0; i < this.shells.length; i++) {
        if (src.includes(this.shells[i])) {
            return this.shells[i];
        }
    }
    console.error(`Shell ${src} cannot be found. Or image path for src is invalid`);
};
exports.getClaws = (src) => {
    for (let i = 0; i < this.claws.length; i++) {
        if (src.includes(this.claws[i])) {
            return this.claws[i];
        }
    }
    console.error(`Claws ${src} cannot be found. Or image path for src is invalid`);
};
exports.getLegs = (src) => {
    for (let i = 0; i < this.legs.length; i++) {
        if (src.includes(this.legs[i])) {
            return this.legs[i];
        }
    }
    console.error(`Legs ${src} cannot be found. Or image path for src is invalid`);
};
exports.getBody = (src) => {
    for (let i = 0; i < this.bodies.length; i++) {
        if (src.includes(this.bodies[i])) {
            return this.bodies[i];
        }
    }
    console.error(`Body ${src} cannot be found. Or image path for src is invalid`);
};
exports.getHeadPieces = (src) => {
    for (let i = 0; i < this.headpieces.length; i++) {
        if (src.includes(this.headpieces[i])) {
            return this.headpieces[i];
        }
    }
    //console.error(`HeadPieces ${src} cannot be found. Or image path for src is invalid`);
};


const prefixAttrs = ["Indestructible", "Reinforced", "Graceful", "Majestic", "Tempestuous"];

const suffixAttrs = ["of Gaia", "of Peace", "of Doom", "of Doom", "of Doom", "of the Unworldly"];

const legendAttrs = [
    "The Minotaur",
    "The Atlantean",
    "Djinn's",
    "Undying",
    "Spirit's",
    "Coldsteel",
    "The Leviathan",
    "Serpent's Eye",
    "The Bone Breaker",
    "Guardian's",
    "Sanctuary",
    "Wit of Lu Dongbin"
];

const bgPrefixAttrs = ["Secret", "Isolated", "Bountiful", "Treasured", "Reborn"];
/** rarity enum **/
const Legendary = Symbol("Legendary");
const Rare = Symbol("Rare");
const Magic = Symbol("Magic");
const Normal = Symbol("Normal");
const Nothing = Symbol("Nothing");

exports.Legendary = Legendary;
exports.Rare = Rare;
exports.Magic = Magic;
exports.Normal = Normal;
exports.Nothing = Nothing;

const CLAWS = Symbol("CLAWS");
const BODY = Symbol("BODY");
const SHELL = Symbol("SHELL");
const LEGS = Symbol("LEGS");
const HEADPIECES = Symbol("HEADPIECES");
const BACKGROUND = Symbol("BACKGROUND");

exports.CLAWS = CLAWS;
exports.BODY = BODY;
exports.SHELL = SHELL;
exports.LEGS = LEGS;
exports.HEADPIECES = HEADPIECES;
exports.BACKGROUND = BACKGROUND;

exports.getBackgroundRarity = (name) => {

    if (name.trim() == "" || name === undefined) return Nothing;
    let containLegendAttr = bgPrefixAttrs.some((el) => name.includes(el));
    if (containLegendAttr) {
        return Rare;
    }
    return Normal;
};
exports.getRarity = (name) => {

    if (name.trim() == "" || name === undefined) return Nothing;
    let containLegendAttr = legendAttrs.some((el) => name.includes(el));
    if (containLegendAttr) {
        return Legendary;
    }

    let containRareAttr =
        prefixAttrs.some((el) => name.includes(el)) &&
        suffixAttrs.some((el) => name.includes(el));
    if (containRareAttr) {
        return Rare;
    }

    let containMagicAttr =
        prefixAttrs.some((el) => name.includes(el)) ||
        suffixAttrs.some((el) => name.includes(el));
    if (containMagicAttr) {
        return Magic;
    }

    return Normal;
};