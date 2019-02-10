import _ from 'lodash';
import substances from './substances';

function _c(t) {
    let r = {};
    r[t] = t;
    return r;
}
const DIRECTIONS = {
    ..._c('NORTH'),
    ..._c('NORTHEAST'),
    ..._c('EAST'),
    ..._c('SOUTHEAST'),
    ..._c('SOUTH'),
    ..._c('SOUTHWEST'),
    ..._c('WEST'),
    ..._c('NORTHWEST'),
    ..._c('UP'),
    ..._c('DOWN'),
};

const NODE_TYPES = {
    ..._c('ROOM'),
    ..._c('OBJECT'),
};

const createFace = function(params){
    return {
        ...faceDefaults,
        ...params,
    };
}

export const createNode = function(metadata){
    let node = _.cloneDeep(nodeDefaults);

}

const nodeDefaults = {
    faces: {
        [DIRECTIONS.NORTH]: createFace(),
        [DIRECTIONS.EAST]: createFace(),
        [DIRECTIONS.SOUTH]: createFace(),
        [DIRECTIONS.WEST]: createFace(),
        [DIRECTIONS.UP]: createFace(),
        [DIRECTIONS.DOWN]: createFace(),
    },
    nodes: [],
};

const faceDefaults = {
    material: substances.VOID,
    nodes: [],
};

export default { createNode };
