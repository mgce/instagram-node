import grpc from 'grpc';

export function grpcErrorHandler(err: Error | null, context: Object, call: grpc.UntypedServiceImplementation): void{
    if(err)
        console.log(err)
}