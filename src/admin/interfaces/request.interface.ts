export interface IRequest {
  requestid: number;
  userid: number;
  value: null | string;
  requesttype: string;
}

export interface IRequestsObject {
  requests: IRequest[];
  total: number;
}

export interface IRequestAnswer {
  message: string;
}
