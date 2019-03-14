function makeFlag(text) {
    return `__${text}__`;
}

const PHASES = {
    LIQUID: makeFlag('LIQUID'),
    SOLID: makeFlag('SOLID'),
    GAS: makeFlag('GAS'),
    PLASMA: makeFlag('PLASMA'),
};

const VOID = {
    name: 'void',
    viscosity: 0,     // 0-100
    density: 0,       // 0-100
    porosity: 0,      // 0-100
    hardness: 0,      // 0-100
    toughness: 0,     // 0-100
    fragmentation: 0, // 0-100
    pH: 7,            // 0-14
    phase: PHASES.GAS,
};

const air = {
    ...VOID,
    name: 'air',
    density: 10,
    fragmentation: 100,
};

const granite = {
    ...VOID,
    name: 'granite',
    density: 80,
    hardness: 80,
    toughness: 80,
    fragmentation: 0,
    phase: PHASES.SOLID,
};

const dirt = {
    ...VOID,
    name: 'dirt',
    density: 50,
    hardness: 30,
    toughness: 20,
    fragmentation: 70,
    phase: PHASES.SOLID,
};

const oak = {
    ...VOID,
    name: 'oak',
    density: 65,
    hardness: 45,
    toughness: 60,
    fragmentation: 0,
    porosity: 30,
    phase: PHASES.SOLID,
};

const oakPlanks = {
    ...oak,
    name: 'oak planks',
    fragmentation: 20,
    density: 62,
}

const pine = {
    ...oak,
    density: 55,
    toughness: 50,
    porosity: 35,
}

const pinePlanks = {
    ...oak,
    name: 'oak planks',
    fragmentation: 20,
    density: 62,
}


const plasterLathe = {
    ...VOID,
    name: 'plaster wall',
    density: 65,
    hardness: 60,
    toughness: 20,
    fragmentation: 40,
    porosity: 15,
    phase: PHASES.SOLID,
}


export default {
    VOID,
    air,
    granite,
    dirt,
    oak,
    oakPlanks,
    plasterLathe,
    
}
