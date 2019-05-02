import { generateGuid } from '../utils/generateGuid';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity{
    @PrimaryGeneratedColumn()
    public id: string;
    @Column()
    public dateCreate: Date;

    constructor(){
        this.id = generateGuid();
        this.dateCreate = new Date();
    }
}