// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var auth_pb = require('./auth_pb.js');

function serialize_auth_GetUserRequest(arg) {
  if (!(arg instanceof auth_pb.GetUserRequest)) {
    throw new Error('Expected argument of type auth.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_GetUserRequest(buffer_arg) {
  return auth_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_GetUserResponse(arg) {
  if (!(arg instanceof auth_pb.GetUserResponse)) {
    throw new Error('Expected argument of type auth.GetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_GetUserResponse(buffer_arg) {
  return auth_pb.GetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// The AuthService definition.
var AuthServiceService = exports.AuthServiceService = {
  // GetUser retrieves user details by user ID.
getUser: {
    path: '/auth.AuthService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.GetUserRequest,
    responseType: auth_pb.GetUserResponse,
    requestSerialize: serialize_auth_GetUserRequest,
    requestDeserialize: deserialize_auth_GetUserRequest,
    responseSerialize: serialize_auth_GetUserResponse,
    responseDeserialize: deserialize_auth_GetUserResponse,
  },
};

exports.AuthServiceClient = grpc.makeGenericClientConstructor(AuthServiceService);
