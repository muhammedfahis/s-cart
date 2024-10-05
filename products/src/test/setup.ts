import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotAuthroizedError } from '@fayisorg/common-modules'; // Assuming these are imported from your common modules

jest.mock('@fayisorg/common-modules', () => {
  const originalModule = jest.requireActual('@fayisorg/common-modules');
  return {
    ...originalModule,
    validateUser: jest.fn(() => {
      return (req: Request, res: Response, next: NextFunction) => {
        if (!req.currentUser) {
          return next();
        }
        // Simulate successful user validation
        // req.currentUser = {
        //   id: 'mocked-user-id',
        //   email: 'test@gmail.com'
        //   // Add other properties as needed
        // };
        next();
      };
    }),
    BadRequestError: jest.fn(),
    NotAuthroizedError: jest.fn(),
  };
});

// In your test file
import { validateUser } from '@fayisorg/common-modules';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';




declare global {
    var signup: () => string[];
  }

let mongoServer:any;
beforeAll( async () => {
    process.env.JWT_KEY ='asdf';
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    // mockedValidateUser.mockImplementationOnce(() => (req: any, res: any, next: any) => {
    //     next(); // Proceed to the next middleware/controller
    // });
});

beforeEach( async() => {
    const collections = await mongoose.connection.db?.collections();
    if(collections) {
        for(const collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if(mongoServer) {
        await mongoServer.stop();
    }
    await mongoose.connection.close();
});

global.signup  = () => {
    const payload = {
        email: 'fahisccc2@gmail.com',
        id: new mongoose.Types.ObjectId().toHexString(),
    }
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const JsonToken = JSON.stringify({ jwt: token });
    const base64Token = Buffer.from(JsonToken).toString('base64');
    return [`session=${base64Token}`];
}

