import { Repository, getRepository } from "typeorm";
import { UserModel } from "../models/user.model";
import { IUser } from "../../interfaces/IUser";

export class UserRepository{
    private repository: Repository<UserModel>

    constructor() {
        this.repository = getRepository(UserModel);
    }

    public async createAndSave(entity: IUser):Promise<IUser>{
        const model = this.repository.create(entity);
        return this.repository.save(model);
    }

    public async findByEmail(emailAddress:string):Promise<IUser>{
        return this.repository.findOne({ emailAddress });
    }
    
    public async findById(userId:number):Promise<IUser>{
        return this.repository.findOne({ id:userId });
    }
}