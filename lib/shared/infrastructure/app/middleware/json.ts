import { EntityNotFound } from '@lib/shared/domain/error/entity-not-found';
import { JSON } from '../../../presentation/serializer';

export const json = (req: any, res: any, next: any) => {
  if (req.headers['accept'] !== 'application/json' && req.headers['content-type'] !== 'application/json') {
    next();
    return;
  }

  let data = '';
  req.on('data', (chunk: any) => {
    data += chunk;
  });

  req.on('end', async () => {
    req.body = data;
    if (req.method === 'POST') {
      res.statusCode = 201;
    }
    res.setHeader('content-type', 'application/json');
    try {
      const response = await next();      
      if (!response) {
        res.statusCode = 204;
        res.end();
      } else if (typeof response === 'object') {
        try {
          res.end(JSON.stringify(response));
        } catch (error: any) {
          res.statusCode = 500;
          res.end(`{"message":"${error.message}"}`);
        }
      } else {
        res.end(response);
      }
    } catch (error: any) {
      if (error instanceof EntityNotFound) {
        res.statusCode = 404;
      } else {
        res.statusCode = 400;
      }
      console.log(error.message);
      res.end(`{"message":"${error.message}"}`);
    }
  });
};