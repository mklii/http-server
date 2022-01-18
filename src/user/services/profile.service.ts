import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '../../database/models/Users.model';
import { profile } from '../mappers/profile.mapper';
import { IProfile } from '../interfaces/profile.interface';

@Injectable()
export class ProfileService {
  constructor(private queryService: DatabaseQueryService) {}

  async profile(id: number, email: string): Promise<IProfile> {
    const user: Users = await this.queryService.userInfo(null, email, null);
    if (!user) throw new BadRequestException('User not exist');

    return profile(user);
  }
}
