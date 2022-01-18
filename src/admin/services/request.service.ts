import { BadRequestException, Injectable } from '@nestjs/common';
import { MailSendService } from '../../utils/mailer/mailer.service';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { userRequest } from '../mappers/request.mapper';
import { Requests } from '../../database/models/Requests.model';
import { IRequest, IRequestsObject } from '../interfaces/request.interface';
import { Users } from '../../database/models/Users.model';
import { Teams } from '../../database/models/Teams.model';

@Injectable()
export class RequestService {
  constructor(
    private mailer: MailSendService,
    private query: DatabaseQueryService,
  ) {}

  async user(limit: number, page: number): Promise<IRequestsObject> {
    const data: Requests[] = await this.query.userRequest(page, limit);
    const returnData: IRequest[] = data.map((value: Requests): IRequest => {
      return userRequest(value);
    });

    return { requests: returnData, total: returnData.length };
  }

  async manager(limit: number, page: number): Promise<IRequestsObject> {
    const data: Requests[] = await this.query.managerRegistrationRequest(
      page,
      limit,
    );
    const returnData: IRequest[] = data.map((value: Requests): IRequest => {
      return userRequest(value);
    });

    return { requests: returnData, total: returnData.length };
  }

  async update(requestid: number, status: string) {
    const findRequest: Requests = await this.query.findRequestByRequestId(
      requestid,
    );
    if (!findRequest) {
      throw new BadRequestException('Wrong request id');
    }

    const user: Users = await this.query.userInfo(
      findRequest.userID,
      null,
      null,
    );

    if (
      (await this.query.checkManagerRegistrationRequest(findRequest.userID)) &&
      status === 'decline'
    ) {
      await this.query.declineManagerRegistrationRequest(findRequest.userID);
      await this.mailer.mail(
        user.email,
        process.env.ADMIN_MAILER_EMAIL,
        'Registration declined',
        'Your registration as manager were declined',
      );
      return {
        message: `Manager registration for user:${findRequest.userID} was declined`,
      };
    }

    if (
      (await this.query.checkManagerRegistrationRequest(findRequest.userID)) &&
      status === 'approve'
    ) {
      await this.query.approveManagerRegistrationRequest(findRequest.userID);
      await this.mailer.mail(
        user.email,
        process.env.ADMIN_MAILER_EMAIL,
        'Registration approved',
        'Your registration as manager were approved',
      );
      return {
        message: `Manager registration for user:${findRequest.userID} was approved`,
      };
    }

    if (findRequest.userID && status === 'decline') {
      const data: Teams = await this.query.teamNotFullCheck(
        parseInt(findRequest.value),
      );
      const formatArr = data.teamUser.filter((v) => v !== findRequest.userID);
      await this.query.changeUserTeam(findRequest.userID, 2);
      await this.query.removeUserIdFromTeam(
        [...formatArr],
        parseInt(findRequest.value),
      );
      await this.query.userRequestDelete(findRequest.requestID);
      await this.mailer.mail(
        user.email,
        process.env.ADMIN_MAILER_EMAIL,
        'Request declined',
        'Your change team request declined',
      );
      return { message: 'Request declined' };
    }

    if (findRequest.userID && status === 'approve') {
      const data: Teams = await this.query.teamNotFullCheck(
        parseInt(findRequest.value),
      );
      if (data.teamUser.length >= 11) {
        return { message: 'Team already full' };
      }
      if (data.teamUser.some((v) => v === findRequest.userID)) {
        return { message: 'User already in team' };
      }

      await this.query.changeUserTeam(
        findRequest.userID,
        parseInt(findRequest.value),
      );

      await this.query.addUserIdInTeam(
        [...data.teamUser, findRequest.userID],
        parseInt(findRequest.value),
      );

      await this.query.userRequestDelete(findRequest.requestID);
      await this.mailer.mail(
        user.email,
        process.env.ADMIN_MAILER_EMAIL,
        'Request approved',
        'Your change team request approved',
      );
      return { message: 'Request approved' };
    }
    throw new BadRequestException('Wrong request');
  }
}
