import euclid from './euclid';
import node from './nodes';
import test from './mapGenerators/test'

export const run = async function(){

    // create a simple space and fill it. the TEST map generator creates
    // a featureless expanse with the bottom 1/3 made of granite, one layer
    // of soil, and the rest is air.
    const testWorld = test.generate(euclid.createSpace(100, 100, 30));

    // let's look at a column of cells and see what the composition of each is
    for (let i = testWorld.getHeight()-1; i > -1; i--)
        console.log(testWorld.getCell(50,50,i).material.name);
    
    // now let's pick a spot on the surface and put a house there.
    testWorld.getCell(50,50).addNode(node.createNode({
        type: node.NODE_TYPES.OBJECT,
        family: node.NODE_FAMILIES.STRUCTURE,
        name: "curious house",
    }));

    // let's see what this made
    console.log(JSON.stringify(testWorld.getCell(50,50)));
}
