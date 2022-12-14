#!/bin/sh

NAMESPACE=$1

if kubectl get ns ${NAMESPACE} | grep ;
then
  echo "this"
fi
