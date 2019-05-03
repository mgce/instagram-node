const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = './src/proto/user.proto'
const SERVER_URI = '0.0.0.0:5001'

const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

// we'll implement the handlers here

const server = new grpc.Server()
server.addService(protoDescriptor.UserService.service, {})
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure())

server.start()
console.log('Server is running!')