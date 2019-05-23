import { BaseEntity } from '@instagram-node/common';
import { Column, Entity } from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class ImageModel extends BaseEntity{
    @Column("bytea")
    public data: any;
    @Column()
    public name: string;

    constructor(data: any, name: string) {
        super();
        this.data = data;
        this.name = name;
    }
}