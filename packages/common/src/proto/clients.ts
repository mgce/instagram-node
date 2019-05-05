// import UserServiceClient from './user-service/user_pb_service'
// import grpc from 'grpc';
// import protoLoader from '@grpc/proto-loader';


// export const clients = [UserServiceClient]

// const loadProtoDescriptor = (serviceName:string)  => {
//     const PROTO_PATH = `./models/${serviceName}.proto`;
//     const packageDefinition = protoLoader.loadSync(PROTO_PATH)
//     const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// }

// const getUserClient = (serviceName:string, serverUri: string) => {
//     const protoDescriptor = loadProtoDescriptor(serviceName);

// }