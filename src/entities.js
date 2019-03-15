import _ from 'lodash';
import uuidv1 from 'uuid/v1';

import { addEntity } from './nodes';

let entityIndex = {};

function _c(t) {
    let r = {};
    r[t] = t;
    return r;
}

const createEntityId = function(){
    const id = uuidv1();
    return `entity:${id}`;
}

export const TYPES = {
    ..._c('HUMAN'),
    ..._c('ANIMAL'),
    ..._c('OBJECT'),
    ..._c('REVENANT'),
};

export const RUNEVERY = { // This entity's script is executed...
    ..._c('TICK'), // every tick of the simulation
    ..._c('MOMENT'), // every time the scene is refreshed
    ..._c('MINUTE'), // every time a minute passes inside the simulation
    ..._c('HOUR'), // every time an hour passes inside the simulation
    ..._c('DAY'), // every time a day passes inside the simulation
};

const UNNAMED_ENTITY = "formless thought";
const UNDESCRIBED_ENTITY = "that cannot bear reflection";
const DOING_NOTHING = "rests uneasily, waiting for nothing in particular";

const entityDefaults = {
    id: null,
    name: UNNAMED_ENTITY,
    description: UNDESCRIBED_ENTITY,
    type: TYPES.OBJECT,
    doing: DOING_NOTHING,
    program: {
        // How often to run this entity's program. Faster periods cost more CPU.
        period: RUNEVERY.DAY,
        // The function itself. TODO: write a specification for this
        function: null,
        // Whether to allow the script to update when it is not being observed
        // by a viewer (the player)
        runWhenUnobserved: false,
    },
    nodeRef: null,
};

export const create = function(params) {
    const defaults = _.cloneDeep(entityDefaults);

    let entity = {
        ...defaults,
        ...params,
        id: createEntityId(),
    }

    // For convenience, let's teach the entity how to call node.addEntity for us
    // without going to the trouble of our looking up the parent
    entity.moveToNode = function(node){
        addEntity.call(node, entity);
    }

    // we might (due to a script or somesuch) need to reference this entity by
    // its ID, so we'll add it to the index to facilitate that
    entityIndex[entity.id] = entity;

    // By default we don't attach the entity to a node, so we're done!
    return entity;
}

export default {
    create,
    TYPES,
    RUNEVERY,
}
