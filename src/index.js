import euclid from './euclid';
import node from './nodes';
import test from './mapGenerators/test';
import substances from './substances';

export const run = async function(){

    // create a simple space and fill it. the TEST map generator creates
    // a featureless expanse with the bottom 1/3 made of granite, one layer
    // of soil, and the rest is air.
    const testWorld = test.generate(euclid.createSpace(200, 200, 5));

    // let's look at a column of cells and see what the composition of each is
    for (let i = testWorld.getHeight()-1; i > -1; i--)
        console.log(testWorld.getCell(50,50,i).material.name);
    
    // now let's pick a spot on the surface and put a house there.
    const house = testWorld.getCell(50,50).addNode(node.createNode({
        type: node.TYPES.OBJECT,
        faces: node.SHAPES.CUBE,
        family: node.FAMILIES.STRUCTURE,
        name: "curious house",
    }));

    const houseInterior = house.addNode({// add an inside node as well
        type: node.TYPES.ROOM,
        faces: node.SHAPES.CUBE,
        name: "curious house interior",
    })

    const portals = node.createPortal({
        from: {
            node: houseInterior.faces[node.DIRECTIONS.NORTH],
            face: {
                type: node.TYPES.OBJECT,
                name: "weathered painted door",
                material: substances.oakPlanks,
            },
        },
        to: {
            node: house.faces[node.DIRECTIONS.NORTH],
            face: {
                type: node.TYPES.OBJECT,
                name: "weathered wooden door",
                material: substances.oakPlanks,
            },
        }
    });
    // let's see what this made
    //console.log(testWorld.stringify());

    console.log(house.stringify());
    console.log(house.faces.NORTH.nodes[0].traversePortal());
}
