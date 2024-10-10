// authMiddleware.ts
import { NotAuthroizedError } from '@fayisorg/common-modules';
import { t } from '../../trpc';

export const requireAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.req.currentUser) {
    throw new NotAuthroizedError();
  }
  return next({
    ctx: {
      // Pass through the current user
      currentUser: ctx.req.currentUser,
    },
  });
});
