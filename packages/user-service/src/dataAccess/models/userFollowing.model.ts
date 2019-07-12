import { BaseEntity } from '@instagram-node/common';
import { IUserFollowing } from '../../interfaces';
import { Entity, Column } from 'typeorm';

@Entity()
export class UserFollowingModel extends BaseEntity implements IUserFollowing{
    @Column()
    public userId: string;
    @Column()
    public followingUserId:string;
}
