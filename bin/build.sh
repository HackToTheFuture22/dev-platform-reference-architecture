#!/bin/sh

BUILD_PATH=$1

if [ ! -d ${BUILD_PATH} ]
then
    echo "${BUILD_PATH} does not exist. Exiting"
    exit 1
fi

pack build dora_app_image -B paketobuildpacks/builder:base -p ${BUILD_PATH} -e NODE_OPTIONS=--openssl-legacy-provider
