
import { EntityRepository, Repository } from "typeorm";
import { tb_token } from "./token.entity";


@EntityRepository(tb_token)
export class TokenRepository extends Repository<tb_token>{

   
}