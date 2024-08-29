declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { IncomingMessage, ServerResponse } from 'http';
  
    type Middleware<Request, Response> = (
      req: Request,
      res: Response,
      next: (err?: any) => void
    ) => void;
  
    interface Handler<Request, Response> {
      (req: Request, res: Response): any | Promise<any>;
    }
  
    interface Options<Request, Response> {
      onError?: (err: any, req: Request, res: Response, next: (err?: any) => void) => void;
      onNoMatch?: (req: Request, res: Response) => void;
    }
  
    export default function nextConnect<Request = NextApiRequest, Response = NextApiResponse>(
      options?: Options<Request, Response>
    ): {
      use: (...handlers: Middleware<Request, Response>[]) => any;
      get: (handler: Handler<Request, Response>) => any;
      post: (handler: Handler<Request, Response>) => any;
      put: (handler: Handler<Request, Response>) => any;
      delete: (handler: Handler<Request, Response>) => any;
      patch: (handler: Handler<Request, Response>) => any;
      all: (handler: Handler<Request, Response>) => any;
    };
  }
  