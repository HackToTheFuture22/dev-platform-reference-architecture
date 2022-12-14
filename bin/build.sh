#!/bin/sh

BUILD_PATH=$1

if [ ! -d ${BUILD_PATH} ]
then
    echo "${BUILD_PATH} does not exist. Exiting"
    exit 1
fi

pack build dora_app_image --buildpack paketo-buildpacks/nodejs \
  --builder paketobuildpacks/builder:base -e NODE_OPTIONS=--openssl-legacy-provider -e NODE_ENV=development
