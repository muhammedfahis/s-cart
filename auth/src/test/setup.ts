import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User, UserDoc } from '../models/userModel';


declare global {
    var signup: () => string[];
    var createUser: () => Promise<UserDoc>;
  }

let mongoServer:any;
beforeAll( async () => {
    process.env.JWT_KEY ='asdf';
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
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

global.createUser = async () => {
    const user = User.build({
        email: 'fahisccc2@gmail.com',
        password: 'test',
        firstName: 'Fahis',
        lastName: 'Khan',
        status: true,
    });
    await user.save();
    return  user;
}
