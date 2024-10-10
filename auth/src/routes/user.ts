
import { INTERFACE_TYPE } from '../utils/appCont';

import { UserController } from '../controllers/userController';
import { createSchema } from '../validators/createUserValidator';
import { loginSchema } from '../validators/loginValidator';
import { requireAuth } from '../utils/trpc-middlewares/require-auth';

import { t } from '../trpc';
import * as z from 'zod';

import { appContainer as container } from '../appContainer';




const controller = container.get<UserController>(INTERFACE_TYPE.UserController);

// Ensure you have a controller object

export const userRouter = t.router({
    create: t.procedure
        .input(createSchema)
        .mutation(async (req) => {
            console.log('redi');
            try {
                const newUser = await controller.createUser(req.input, req.ctx);
                return newUser;
            } catch (error) {
                // Handle or rethrow the error as needed
                throw error;
            }
        }),
    login: t.procedure
        .input(loginSchema)
        .mutation(async (req) => {
            try {
                const token = await controller.login(req.input,req.ctx);
                return token;
            } catch (error: any) {
                throw error;
            }
        }),
    logout: t.procedure
        .use(requireAuth)
        .mutation(async (req) => {
            try {
                await controller.logout(req.ctx); // Assuming logout uses context
                return { success: true };
            } catch (error) {
                throw error;
            }
        }),
    block: t.procedure
        .use(requireAuth)
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async (req) => {
            try {
                const blockedUser = await controller.blockUser(req.input.id);
                return blockedUser;
            } catch (error) {
                throw error;
            }
        }),
    unblock: t.procedure
        .use(requireAuth)
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async (req) => {
            try {
                const unblockedUser = await controller.unBlockUser(req); // Assuming unblockUser exists
                return unblockedUser;
            } catch (error) {
                throw error;
            }
        }),
});
