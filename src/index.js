import euclid from './euclid';

export const run = async function(){
    const testWorld = euclid.createSpace(3, 3, 3);

    console.log(testWorld);
    console.log(testWorld.getCell(2,2,2).getPosition());
}
