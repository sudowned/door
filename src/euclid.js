import substances from './substances';

const cellDefaults = {
    material: substances.air,
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

// Generates a cell's data. Right now that doesn't mean very much, but at some
// point it will be reasonably complicated.
export const createCell = function(metadata){
    const position = metadata.position;

    if (!position) throw new Error(
        "Attempted to create cell without position assignment. Refusing."
    );
    delete(metadata.position);

    return {
        ...cellDefaults,
        ...metadata,
        // It's vital that we be able to identify this cell at any time, so we
        // offer a getPosition function which provides the information. The
        // actual position values are a block scope variable which cannot be
        // otherwise accessed, preventing overwrite.
        getPosition: function(){ return {...position}; }
    };
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

    function getCell(x,y,z){
        return cells[x][y][z];
    }

    const container = {
        nextTick: function(){ tick++; },
        getTick: function(){ return tick; },
        getCell,
        initialized: 0,
        cells,
    };
    container.getHeight = getHeight.bind(container);
    container.getLength = getLength.bind(container);
    container.getWidth = getWidth.bind(container);

    return container;
}

export default {
    createSpace,
    createCell,
};
