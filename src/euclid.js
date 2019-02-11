import substances from './substances';
import { addNode } from './nodes';

const cellDefaults = {
    material: substances.air,
    nodes: [],
};

function getWidth(){
    return this.cells.length;
}

function getLength(){
    return this.cells[0].length;
}

function getHeight(){
    return this.cells[0][0].length;
}

// Finds the z coordinate of the first cell in a column which can be considered
// a "surface". This is most commonly used to find the highest non-air cell upon
// which to anchor a node. By adding water to the excludeMaterials list, it can
// be made to find riverbed surfaces, etc. as well.
function getSurfaceHeight(x, y, excludeMaterials = [substances.air]) {
    const mapHeight = this.getHeight();
    for (let z = mapHeight-1; z >= 0; z--) {
        const c = this.getCell(x,y,z);
        if ((excludeMaterials.map(a => a.name)).indexOf(c.material.name) > -1) continue;

        return z;
    }

    return -1;
}

// Generates a cell's data. Right now that doesn't mean very much, but at some
// point it will be reasonably complicated.
export const createCell = function(metadata){
    const position = metadata.position;

    if (!position) throw new Error(
        "Attempted to create cell without position assignment. Refusing."
    );
    delete(metadata.position);

    const cell = {
        ...cellDefaults,
        ...metadata,
        // It's vital that we be able to identify this cell at any time, so we
        // offer a getPosition function which provides the information. The
        // actual position values are a block scope variable which cannot be
        // otherwise accessed, preventing overwrite.
        getPosition: function(){ return {...position}; }
    };

    cell.addNode = addNode.bind(cell);

    return cell;
}

// Creates a euclidean space with X/Y/Z coordinates suitable for generating
// surfaces, as well as anchoring nodes to.
export const createSpace = function(width, length, height){
    let tick = 0; // each time we advance the simulation, increment this
    const cells = new Array(width);
    for (let x = 0; x < width; x++) {
        cells[x] = new Array(length);
        for (let y = 0; y < length; y++){
            cells[x][y] = new Array(height);
            for (let z = 0; z < height; z++){
                cells[x][y][z] = createCell({
                    position: {
                        x,
                        y,
                        z,
                    }
                });
            };
        };
    };

    function getCell(x,y,z = -1){
        if (z < 0) z = this.getSurfaceHeight(x,y);
        return cells[x][y][z];
    }

    const container = {
        nextTick: function(){ tick++; },
        getTick: function(){ return tick; },
        getCell,
        initialized: 0,
        cells,
    };


    [ // Create map-scoped utility functions
        getHeight,
        getWidth,
        getLength,
        getSurfaceHeight,
    ].forEach(f => container[f.name] = f.bind(container));

    return container;
}

export default {
    createSpace,
    createCell,
};
