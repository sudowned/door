import _ from 'lodash';
import substances from '../substances';

function generate(srcSpace){
    let space = _.cloneDeep(srcSpace);
    const height = space.getHeight();
    const landHeight = Math.floor(height / 3) + 1;

    for (let x = 0; x < space.getWidth(); x++) {
        for (let y = 0; y < space.getWidth(); y++) {
            for (let z = 0; z < space.getHeight(); z++)
                if (z < landHeight) {
                    console.log('eep', x,y,z)
                    console.log(space.getCell(x,y,z))
                    space.getCell(x,y,z).material = substances.granite;
                } else if (z == landHeight) {
                    console.log('oop', z)
                    space.getCell(x,y,z).material = substances.dirt;
                }
        }
    }

    return space;
}

export default {
    generate,
};
