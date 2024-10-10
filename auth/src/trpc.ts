// trpc.ts
import { currentUser } from '@fayisorg/common-modules';
import { initTRPC } from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import { NextFunction, Request, Response } from 'express';

const currentUserPromise = (req: Request, res: Response): Promise<void> => {
    return new Promise((resolve, reject) => {
      currentUser(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };
// Create your context
export const createContext = async ({ req, res }: { req: Request; res: Response }) => {
    await currentUserPromise(req,res);
    return { req, res } ;
};

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export { t };
