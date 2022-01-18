import { IRequest } from '../interfaces/request.interface';
import { Requests } from '../../database/models/Requests.model';

export const userRequest = (data: Requests): IRequest => {
  return {
    requestid: data.requestID,
    userid: data.userID,
    requesttype: data.requestType,
    value: data.value,
  };
};
