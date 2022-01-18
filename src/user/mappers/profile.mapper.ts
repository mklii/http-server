import { Users } from '../../database/models/Users.model';
import { IProfile } from '../interfaces/profile.interface';

export const profile = (user: Users): IProfile => {
  return {
    userid: user.userID,
    avatar: user.avatarImage,
    username: user.username,
    email: user.email,
    role: user.role.name,
    team: user.team.teamName,
  };
};
