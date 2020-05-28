'use strict';
import euclid from './euclid';
import node from './nodes';
import test from './mapGenerators/test';
import entity from './entities';
import substances from './substances';

import inquirer from 'inquirer';

export const run = async function(){

    // create a simple space and fill it. the TEST map generator creates
    // a featureless expanse with the bottom 1/3 made of granite, one layer
    // of soil, and the rest is air.
    const testWorld = test.generate(euclid.createSpace(200, 200, 5));

    // let's look at a column of cells and see what the composition of each is
    for (let i = testWorld.getHeight()-1; i > -1; i--)
        console.log(testWorld.getCell(50,50,i).material.name);

    // now let's pick a spot on the surface and put a house there.
    const house = testWorld.getCell(50,50).addNode();

    // let's see what this made
    //console.log(testWorld.stringify());

    //console.log(house.stringify());
    //console.log(house.faces.NORTH.nodes[0].traversePortal());

    // let's make somebody miserable inside this house
    const miserableMan = entity.create({
        name: "Bertram",
        description: "disheveled, wide-eyed man with the emotional readiness of a dropped champagne bottle",
        type: entity.TYPES.HUMAN,
    });

    houseInterior.addEntity(miserableMan);

    //console.log(house.stringify());

    
}
