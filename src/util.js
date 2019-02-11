import * as safe from '@oresoftware/safe-stringify';

export const stringify = function(){
    return safe.stringify(this);
}
