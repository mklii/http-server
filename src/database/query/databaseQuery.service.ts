import { Users } from '../models/Users.model';
import { Teams } from '../models/Teams.model';
import { Roles } from '../models/Roles.model';
import { Requests } from '../models/Requests.model';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Blocklists } from '../models/Blocklists.model';

@Injectable()
export class DatabaseQueryService {
  async userInfo(
    id?: number | null,
    email?: string | null,
    username?: string | null,
  ): Promise<Users> {
    let where = {};
    id !== null ? (where = { userID: id }) : null;
    email !== null ? (where = { email: email }) : null;
    username !== null ? (where = { username: username }) : null;
    return await Users.findOne({
      where,
      include: [Roles, Teams, Requests],
    });
  }

  async userCreate(
    username: string,
    email: string,
    password: string,
    role: number,
  ): Promise<Users> {
    const hashPassword: string = bcrypt.hashSync(password, 10);
    return await Users.create({
      username: username,
      email: email,
      password: hashPassword,
      roleID: role,
      teamID: 2,
      avatarImage: 'Empty',
    });
  }

  async managerCreate(
    username: string,
    email: string,
    password: string,
    role: number,
  ): Promise<Users> {
    const hashPassword: string = bcrypt.hashSync(password, 10);
    return await Users.create({
      username: username,
      email: email,
      password: hashPassword,
      roleID: role,
      teamID: 1,
      avatarImage: 'Empty',
    });
  }

  async managerCreateRequest(userID: number): Promise<Requests> {
    return await Requests.create({
      userID: userID,
      requestType: 'Register as Manager',
      value: null,
    });
  }

  async findTeam(teamID: number): Promise<Teams> {
    return await Teams.findOne({
      where: { teamID: teamID },
    });
  }

  async findRequestById(userID: number): Promise<Requests> {
    return Requests.findOne({
      where: { userID: userID },
    });
  }

  async findRequestByRequestId(id: number): Promise<Requests> {
    return Requests.findOne({
      where: { requestID: id },
    });
  }

  async changePasswordRequest(
    userID: number,
    token: string,
  ): Promise<Requests> {
    return await Requests.create({
      userID: userID,
      requestType: `Change password`,
      value: token,
    });
  }

  async changePassword(password: string, email: string) {
    return await Users.update(
      { password: password },
      { where: { email: email } },
    );
  }

  async userRequestDelete(requestID: number) {
    return await Requests.destroy({ where: { requestID: requestID } });
  }

  async userEnterToTeamRequest(id: number, teamID: number): Promise<Requests> {
    return await Requests.create({
      userID: id,
      requestType: `Enter to team with id: ${teamID}`,
      value: `${teamID}`,
    });
  }

  async userLeaveTeamRequest(userID: number): Promise<Requests> {
    return await Requests.create({
      userID: userID,
      requestType: 'Leave Team',
      value: '2',
    });
  }

  async changeName(username: string, email: string) {
    return await Users.update(
      { username: username },
      { where: { email: email } },
    );
  }

  async changeAvatar(avatar: any, email: string) {
    return await Users.update(
      { avatarImage: `./${avatar.filename}` },
      { where: { email: email } },
    );
  }

  async allUsers(page: number, limit: number): Promise<Users[]> {
    return await Users.findAll({
      where: { roleID: 3 },
      include: [Roles, Teams, Requests],
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async allManagers(page: number, limit: number): Promise<Users[]> {
    return await Users.findAll({
      where: { roleID: 2 },
      include: [Roles, Teams, Requests],
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async managerByID(id: number): Promise<Users> {
    return await Users.findOne({
      where: { [Op.and]: [{ userID: id }, { roleID: 2 }] },
      include: [Roles, Teams, Requests],
    });
  }

  async allUserInTeam(page: number, limit: number): Promise<Users[]> {
    return await Users.findAll({
      where: { [Op.or]: [{ teamID: 3 }, { teamID: 4 }] },
      include: [Roles, Teams, Requests],
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async userRequest(page: number, limit: number) {
    return await Requests.findAll({
      where: { requestType: { [Op.not]: 'Register as Manager' } },
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async managerRegistrationRequest(page: number, limit: number) {
    return await Requests.findAll({
      where: { requestType: 'Register as Manager' },
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async allUserByTeam(
    page: number,
    limit: number,
    teamID: number,
  ): Promise<Users[]> {
    return await Users.findAll({
      where: { teamID: teamID },
      include: [Roles, Teams, Requests],
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async checkManagerRegistrationRequest(userID: number): Promise<Requests> {
    return await Requests.findOne({
      where: {
        [Op.and]: [{ userID: userID }, { requestType: 'Register as Manager' }],
      },
    });
  }

  async declineManagerRegistrationRequest(userID: number) {
    await Requests.destroy({
      where: {
        [Op.and]: [{ userID: userID }, { requestType: 'Register as Manager' }],
      },
    });
    return await Users.destroy({
      where: { userID: userID },
    });
  }

  async approveManagerRegistrationRequest(userID: number) {
    return await Requests.destroy({
      where: {
        [Op.and]: [{ userID: userID }, { requestType: 'Register as Manager' }],
      },
    });
  }

  async teamNotFullCheck(teamID: number) {
    return await Teams.findOne({
      where: { teamID: teamID },
    });
  }

  async changeUserTeam(userID: number, teamID: number) {
    return await Users.update(
      { teamID: teamID },
      { where: { userID: userID } },
    );
  }

  async removeUserIdFromTeam(arr: Array<number>, teamID: number) {
    return await Teams.update({ teamUser: arr }, { where: { teamID: teamID } });
  }

  async addUserIdInTeam(arr: Array<number>, teamID: number) {
    return await Teams.update({ teamUser: arr }, { where: { teamID: teamID } });
  }

  async checkUserBan(userID: number) {
    return await Blocklists.findOne({
      where: { [Op.and]: [{ userID: userID }, { status: 'Banned!' }] },
    });
  }

  async userBan(userID: number, reason: string) {
    return await Blocklists.create({
      userID: userID,
      reason: reason,
      status: 'Banned!',
    });
  }

  async userUnban(userID: number) {
    return await Blocklists.destroy({
      where: { [Op.and]: [{ userID: userID }, { status: 'Banned!' }] },
    });
  }

  async userDelete(userID: number, reason: string) {
    return await Blocklists.create({
      userID: userID,
      reason: reason,
      status: 'Deleted!',
    });
  }
}
