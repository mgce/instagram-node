import { BaseEntity } from '@instagram-node/common';
import { IUserFollow } from '../../interfaces';
import { Entity, Column } from 'typeorm';

@Entity()
export class UserFollowModel extends BaseEntity implements IUserFollow{
    @Column()
    public userId: number;
    @Column()
    public followingUserId:number;
}
