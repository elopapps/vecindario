export class Neighbour {
    id?:number;
    name?:string;
    age?:number;
    friends?:string[];
    hair_color?:string;
    height?:number;
    weight?:number;
    professions?:string[];
    thumbnail?:string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
