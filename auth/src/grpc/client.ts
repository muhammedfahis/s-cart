import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import { User } from '../models/userModel';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = path.join(__dirname, '../../proto/auth.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const userProto = grpc.loadPackageDefinition(packageDefinition).auth as any;

  interface IAuthServiceServer extends grpc.UntypedServiceImplementation {
    GetUser: grpc.handleUnaryCall<any, any>;
  }

  const authService: IAuthServiceServer = {
    GetUser: async (call, callback) => {
      const userId = call.request.user_id;
      if(!userId) return;
      try {
        const user = await User.findById(userId);
        callback(null, {
            id: user?.id,
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            status: user?.status
        });
      } catch (error:any) {
        callback(error);
      }
      
    },
  };

  export { authService, userProto }
