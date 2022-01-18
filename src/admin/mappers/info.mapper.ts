import { Users } from '../../database/models/Users.model';
import { IProfile } from '../interfaces/info.interface';

export const profile = (data: Users): IProfile => {
  return {
    userid: data.userID,
    username: data.username,
    email: data.email,
    avatar: data.avatarImage,
    role: data.role.name,
    team: data.team.teamName,
  };
};
