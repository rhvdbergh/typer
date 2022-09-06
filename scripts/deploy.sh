#!/bin/bash

docker buildx build --platform=linux/amd64 -t crrhvdbergh.azurecr.io/typer-greek
docker push crrhvdbergh.azurecr.io/typer-greek