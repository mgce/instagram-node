# Instagram-Node

It is an Instagram clone written with Node.js. I used here microservice architecture and GRPC to communication between services. Project is a monorepo supported with Lerna.

## Microservices
- **API Gateway** - is a single point of entry for all microservices.
- **User Service** - this microservice manage users and relations between them.
- **Post Service** - here we manage posts, their likes, and comments.

There is also an **Image service** in source code, but for now, it is not used. I moved image upload to API Gateway, because for now, I don't need separate service for this.

## Technology

Backend:
- Node.js
- Postgres
- GRPC

Frontend
- React with Redux

## Run

To run the project, you need to have installed Docker and Azure Storage Emulator. In main directory run command:

```
docker-compose up
```

This should be enough to run containers correctly.
