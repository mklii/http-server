import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { IProfile, IProfilesObject } from '../interfaces/info.interface';
import { Users } from '../../database/models/Users.model';
import { profile } from '../mappers/info.mapper';

@Injectable()
export class InfoService {
  constructor(private query: DatabaseQueryService) {}

  async manager(id: number): Promise<IProfile> {
    const data: Users = await this.query.managerByID(id);
    if (!data) {
      throw new BadRequestException('User not exist or not a manager');
    }
    return profile(data);
  }

  async managers(limit: number, page: number): Promise<IProfilesObject> {
    const data: Users[] = await this.query.allManagers(page, limit);
    const returnData: IProfile[] = data.map((value: Users): IProfile => {
      return profile(value);
    });
    return { users: returnData, total: returnData.length };
  }

  async user(id: number): Promise<IProfile> {
    const data: Users = await this.query.userInfo(id, null, null);
    if (!data) {
      throw new BadRequestException('User not exist');
    }

    return profile(data);
  }

  async users(limit: number, page: number): Promise<IProfilesObject> {
    const data: Users[] = await this.query.allUsers(page, limit);
    const returnData: IProfile[] = data.map((value: Users): IProfile => {
      return profile(value);
    });
    return { users: returnData, total: returnData.length };
  }
}
