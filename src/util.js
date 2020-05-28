import * as safe from '@oresoftware/safe-stringify';

export const stringify = function(){
    return safe.stringify(this);
}

export const irandom = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
