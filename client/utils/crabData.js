
let Background = {
  extras_vietnam: "extras_vietnam",
  ocean_abysbioluminescence: "ocean_abysbioluminescence",
  science_lab: "science_lab",
};
export const getBackground = (backgroundSrc) => {

     for (const [key, value] of Object.entries(Background)) {
         if (backgroundSrc.includes(key)) {
             return Background[key]
             //return await loadImage(path.resolve(`images/Backgrounds/${Background[key]}_1.svg`));
         }
     }
     console.error(`Background ${backgroundSrc} cannot be found.`);
};

let Shell = {
  metal_alembic: "metal_alembic",
  wood_carnivora: "wood_carnivora",
  partner_kongz: "partner_kongz",
};
export const getShell = (src) => {
    for (const [key, value] of Object.entries(Shell)) {
        if (src.includes(key)) {
            return Shell[key]
            //return await loadImage(path.resolve(`images/Shell/${Shell[key]}_1.svg`));
        }
    }
    console.error(`Shell ${src} cannot be found. Or image path for src is invalid`);
};

let Claws = {
  metal_lasergun: "metal_lasergun",
  snow_icycle: "snow_icycle",
  wood_hammerlogs: "wood_hammerlogs",
};
export const getClaws = (src) => {
    for (const [key, value] of Object.entries(Claws)) {
        if (src.includes(key)) {
            return Claws[key]
            //return await loadImage(path.resolve(`images/Claws/${Claws[key]}_1.svg`));
        }
    }
    console.error(`Claw ${src} cannot be found. Or image path for src is invalid`);
};

let Legs = {
  wood_3: "wood_3",
  snow_1: "snow_1",
};
export const getLegs = (src) => {
    for (const [key, value] of Object.entries(Legs)) {
        if (src.includes(key)) {
            return Legs[key]
            //return await loadImage(path.resolve(`images/Legs/${Legs[key]}_1.svg`));
        }
    }
    console.error(`Legs ${src} cannot be found. Or image path for src is invalid`);
};


let Body = {
  metal_golden: "metal_golden",
  wood_beastman: "wood_beastman",
  partner_kongz: "partner_kongz",
};
export const getBody = (src) => {
    for (const [key, value] of Object.entries(Body)) {
        if (src.includes(key)) {
            return Body[key]
            //return await loadImage(path.resolve(`images/Body/${Body[key]}_1.svg`));
        }
    }
    console.error(`Shell ${src} cannot be found. Or image path for src is invalid`);
};