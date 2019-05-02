import { AccountDto } from './../dto/accountDto';
import { AccountModel } from '../models/account.model';
import { Repository, getRepository } from 'typeorm';
export class AccountRepository {

    private repository: Repository<AccountModel>

    constructor() {
        this.repository = getRepository(AccountModel);
    }

    public create(dto: AccountDto): Promise<AccountModel> {
        return new Promise((result, err) => {
            try {
                var entity = this.repository.create(dto);
                return result(entity)
            } catch{
                return err("There was an error during save")
            }
        })
    }

    public find(id:number): Promise<AccountModel|undefined>{
        return new Promise((result, err)=>{
            try{
                var entity = this.repository.findOne(id);
                return result(entity);
            }catch{
                err("There was an error during finding entity")
            }
        })
    }
}