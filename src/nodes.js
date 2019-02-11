import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import substances from './substances';

let nodeIndex = {};

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

export const NODE_TYPES = {
    ..._c('ROOM'),
    ..._c('OBJECT'),
};

export const NODE_FAMILIES = {
    ..._c('STRUCTURE'),
    ..._c('SURFACE'),
    ..._c('CONTAINER'),
};

const UNNAMED_NODE = "a shapeless idea";

const createNodeName = function(){
    const id = uuidv1();
    return `node:${id}`;
}

const faceDefaults = {
    material: substances.VOID,
    nodes: [],
};

const createFace = function(params){
    return {
        ...faceDefaults,
        ...params,
    };
}

export function addNode(node){
    this.nodes.push(node);
    return node;
}

const nodeDefaults = {
    id: null,
    faces: {
        [DIRECTIONS.NORTH]: createFace(),
        [DIRECTIONS.EAST]: createFace(),
        [DIRECTIONS.SOUTH]: createFace(),
        [DIRECTIONS.WEST]: createFace(),
        [DIRECTIONS.UP]: createFace(),
        [DIRECTIONS.DOWN]: createFace(),
    },
    type: null,
    family: null,
    name: UNNAMED_NODE,
    dimensions: { // dimensions is in inches
        length: 0,
        width: 0,
        height: 0,
    },

    nodes: [],
};

export const createNode = function(params){
    let node = {
        ..._.cloneDeep(nodeDefaults),
        ...params,
        id: createNodeName,
    };

    node.addNode = addNode.bind(node);

    // also add the node to the index so that we may later look it up by ID
    nodeIndex[node.id] = node;
    // and return the node as an object for immediate use
    return node;
}

export default {
    createNode,
    NODE_TYPES,
    NODE_FAMILIES,
};
