#!/bin/bash
VERSION=$(node -p "require('./package.json').version")

IMAGE_NAME="ery-ai-image:$VERSION"
CONTAINER_NAME="ery-ai"

echo "Construyendo la imagen Docker: $IMAGE_NAME"
docker build -t $IMAGE_NAME .

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Eliminando contenedor existente: $CONTAINER_NAME"
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

echo "Levantando el contenedor: $CONTAINER_NAME"
docker run -d \
  --name $CONTAINER_NAME \
  --env-file .env.prod \
  -p 3000:3000 \
  $IMAGE_NAME

echo "¡Contenedor $CONTAINER_NAME levantado correctamente con la imagen $IMAGE_NAME!"
