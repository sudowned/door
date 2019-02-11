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
    fragmentation: 0,
    phase: PHASES.SOLID,
};

const dirt = {
    ...VOID,
    name: 'dirt',
    density: 50,
    hardness: 30,
    fragmentation: 70,
    phase: PHASES.SOLID,
};

export default {
    VOID,
    air,
    granite,
    dirt,
}
