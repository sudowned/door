import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import substances from './substances';
import { stringify } from './util';

let nodeIndex = {};

function _c(t) {
    let r = {};
    r[t] = t;
    return r;
}

export const DIRECTIONS = {
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

export const SHAPES = {
    CUBE: {
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.WEST]: null,
        [DIRECTIONS.UP]: null,
        [DIRECTIONS.DOWN]: null,
    },
};

export const TYPES = {
    ..._c('ROOM'),
    ..._c('OBJECT'),
    ..._c('FACE'),
    ..._c('PORTAL'),
};

export const FAMILIES = {
    ..._c('STRUCTURE'),
    ..._c('SURFACE'),
    ..._c('CONTAINER'),
};

const UNNAMED_NODE = "shapeless idea";
const UNDESCRIBED_NODE = "without any notion of self";

const createNodeId = function(){
    const id = uuidv1();
    return `node:${id}`;
}

// Creates a portal, which is a special kind of node with exactly two parents,
// which can be traversed to reach the other parent node. From either parent,
// the portal has a special "face" node which defines it as a narrative object,
// such as a door or window.
export const createPortal = function(input) {
    const { from, to } = input;
    const portal = createNode({
        type: TYPES.PORTAL,
        // After we create the portal, it ceases to have a "from" and "to" side.
        // Conceptually this is only useful at creation.
        parents: [from.node, to.node],
    });

    const traversePortal = function (from){
        // Pull out the node which ISN'T the node we're coming from in order to
        // find the other side
        return portal.parents[0].id === this.id
            ? portal.parents[1]
            : portal.parents[0];
    };

    const fromFace = createNode({
        ...from.face
    });

    const toFace = createNode({
        ...to.face
    });

    [ fromFace, toFace ].forEach( n => n.traversePortal = traversePortal.bind(n));

    // now we need to add each facade node to the parent's nodes list
    from.node.addNode(fromFace);
    to.node.addNode(toFace);

    // return the face nodes in case the caller wants to chain more methods
    return [ fromFace, toFace ];
}

// Attaches a node to a node or cell. Accepts either a pre-existing node, or an
// object suitable for instantiation with createNode.
export function addNode(node){
    if (!node.id) node = createNode(node); // if it's not a pre-existing node, create it
    if (node.parents.length == 0) node.defaultPortal = this;
    node.parents.push(this);
    this.nodes.push(node);
    return node;
}

// Attaches an entity to the bound node. Handles deregistration of previous
// node for you. Useless without being bound.
export function addEntity(e){
    if (e.nodeRef) {
        // TODO: log this to some kind of dev exception stream instead of
        // barfing it out into the player stream
        if (!e.nodeRef[e.id]) console.warn(
            `Attempted to deregister unknown entity ${e.id} from node ${e.nodeRef.id}.`)
        delete e.nodeRef[e.id];

        e.nodeRef = this;
    }

    this.entities[e.id] = e;

    // return node for chaining
    return this;
}

// TODO: figure out when we want to call it "a" vs. "the", etc
function describe(increment=true, forceFullDescribe=false){
    let phrase = `a ${this.name}`;
    if (this.describedCount > 0 || forceFullDescribe)
        phrase = [phrase, this.description].join(', ');

    if (increment) this.describedCount++;
    return phrase;
}

function changeDescription(name=false, description=false, resetDescribedCount = true){
    if ((name || description) && resetDescribedCount) this.describedCount = 0;
    if (name) this.name = name;
    if (description) this.description = description;

    // return current node for further chaining
    return this;
}

const nodeDefaults = {
    id: null,
    faces: {},
    type: null,
    family: null,
    name: UNNAMED_NODE,
    description: UNDESCRIBED_NODE,
    material: null,
    describedCount: 0,
    transparent: true,
    defaultPortal: null,
    dimensions: { // dimensions is in inches
        length: 0,
        width: 0,
        height: 0,
    },

    parents: [],
    entities: {},
    nodes: [],
};

export const createNode = function(params, subnode = false){
    const defaults = _.cloneDeep(nodeDefaults);
    if (subnode) delete(defaults.faces);

    let node = {
        ...defaults,
        ...params,
        id: createNodeId(),
    };

    [
        addNode,
        addEntity,
        stringify,
        describe,
        changeDescription,
    ].forEach(f => node[f.name] = f.bind(node));

    if (!subnode && Object.keys(node.faces).length > 0) {
        Object.keys(node.faces).forEach(direction => {
            node.faces[direction] = createNode({
                type: TYPES.FACE,
                parents: [ node ],
            }, true);
        });
    }

    // also add the node to the index so that we may later look it up by ID
    nodeIndex[node.id] = node;
    // and return the node as an object for immediate use
    return node;
}

export default {
    createNode,
    createPortal,
    TYPES,
    FAMILIES,
    DIRECTIONS,
    SHAPES,
};
