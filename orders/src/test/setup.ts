import { Request, Response, NextFunction } from 'express';
import { Product as IProduct } from '../entities/Product';

jest.mock('@fayisorg/common-modules', () => {
    const originalModule = jest.requireActual('@fayisorg/common-modules');
    return {
        ...originalModule,
        KafkaConsumer: class {
            constructor() {
                return new originalModule.KafkaConsumer();
            }
            subscribe() {
                return;
            }
        },
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


import { MongoMemoryReplSet, MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Product } from '../models/productModel';
import { KafkaConsumer } from '@fayisorg/common-modules';



declare global {
    var signup: () => string[];
    var generateProduct:() => Promise<IProduct>;
}

let mongo: MongoMemoryReplSet;
beforeAll(async () => {
    mongo = await MongoMemoryReplSet.create({
        replSet: { count: 1 }, // Set the replica set with one member
    });
    process.env.JWT_KEY = 'asdf';
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db?.collections();
    if (collections) {
        for (const collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
});

global.signup = () => {
    const payload = {
        email: 'fahisccc2@gmail.com',
        id: new mongoose.Types.ObjectId().toHexString(),
    }
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const JsonToken = JSON.stringify({ jwt: token });
    const base64Token = Buffer.from(JsonToken).toString('base64');
    return [`session=${base64Token}`];
}

global.generateProduct = async () => {
    const product = Product.build({
        category:'test',
        name:'test_name',
        description:'test_description',
        price:20,
        quantity:100,
        imageUrl: 'google.com',
        _id: new mongoose.Types.ObjectId()
    })
    await product.save();
    return product;
}

