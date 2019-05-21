yarn build
docker build -t api-gateway -f Dockerfile.apigateway .
docker build -t user-service -f Dockerfile.userservice .
docker build -t post-service -f Dockerfile.postservice .
docker build -t image-service -f Dockerfile.imageservice .
docker-compose up