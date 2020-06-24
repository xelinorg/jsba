#!/bin/bash

echo "building jsba"

if [[ -d build ]]
then
  echo "build directory exists, run clean script before building"
else
  echo "creating build directory"
  mkdir build
  cp -R container build
  cp -R src build/container/api
  cp -R package.json build/container/api
  cd build/container/api
  docker build -t api .
  cd ../mongodb
  docker build -t mongodb .
  cd ../
  docker-compose up
fi
