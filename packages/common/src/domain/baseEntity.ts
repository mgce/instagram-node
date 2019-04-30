import { generateGuid } from '../utils/generateGuid';

export class BaseEntity{
    public id: string;
    public dateCreate: Date;

    constructor(){
        this.id = generateGuid();
        this.dateCreate = new Date();
    }
}