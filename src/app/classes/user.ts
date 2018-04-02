export class User {
    id?:number;
    username?:string;
    password?:string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}