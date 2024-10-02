import * as grpc from '@grpc/grpc-js';
import { userProto, authService } from './client';

function startGrpcServer() {
    const server = new grpc.Server();
    server.addService(userProto.AuthService.service, authService);
    const grpcPort = '0.0.0.0:50051';
    server.bindAsync(grpcPort, grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        console.error(`Error binding gRPC server: ${error.message}`);
        return;
      }
      console.log(`gRPC server running on port ${port}`);
      server.start();
    });
  }

  export { startGrpcServer };
