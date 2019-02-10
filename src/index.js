import euclid from './euclid';
import node from './nodes';
import test from './mapGenerators/test'

export const run = async function(){
    const testWorld = test.generate(euclid.createSpace(3, 3, 10));

    for (let i = 0; i < 10; i++) console.log(testWorld.getCell(2,2,i).material.name);
    console.log(testWorld.getSurfaceHeight(2,2));
}
