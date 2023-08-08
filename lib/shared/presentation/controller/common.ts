import { Protocol, Request, Response } from '0http/common';

export type Req = Request<Protocol.HTTP> & {
  body: any;
  params: any;
};

export type Res = Response<Protocol.HTTP>;