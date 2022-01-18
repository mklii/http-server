import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret } from '../../config/auth.config';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { Users } from '../../database/models/Users.model';

@Injectable()
export class LoginService {
  constructor(private query: DatabaseQueryService) {}

  async login(email: string, password: string): Promise<string> {
    const userData: Users = await this.query.userInfo(null, email, null);
    if (!userData) {
      throw new BadRequestException('User with this email not exist');
    }

    if (!bcrypt.compareSync(password, userData.password)) {
      throw new BadRequestException('Invalid password');
    }

    return sign({ email: email, id: userData.userID }, secret);
  }
}
