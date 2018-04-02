import { Neighbour } from "./neighbour";

export class Village {
    Brastlewark?:Neighbour[];

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}