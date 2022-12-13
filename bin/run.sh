#!/bin/sh

if [[ -n "$(docker info | grep 'Docker Desktop')" ]]; then
    echo "Docker Desktop found."
else
    echo "WARNING! Docker Desktop not installed:"
    echo "  * Install docker desktop from https://docs.docker.com/get-docker/"
    exit 1
fi

yarn install
yarn docker:up
yarn start
