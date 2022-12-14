#!/bin/sh

BUILD_PATH=$1
IMAGE_NAME=$2

if [ ! -d ${BUILD_PATH} ]
then
    echo "${BUILD_PATH} does not exist. Exiting"
    exit 1
fi

pack build ${IMAGE_NAME} --buildpack paketo-buildpacks/nodejs \
  --builder paketobuildpacks/builder:base -e NODE_OPTIONS=--openssl-legacy-provider -e NODE_ENV=development
