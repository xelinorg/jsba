#!/bin/bash

echo "building jsba"

if [[ -d build ]]
then
  echo "build directory exists, run clean script before building"
else
  echo "creating build directory"
  mkdir build
  API_PATH=build/container/api
  cp -R container build
  cp -R src $API_PATH
  cp -R index.js $API_PATH
  cp -R package.json $API_PATH
  cd $API_PATH
  docker build -t api .
  cd ../mongodb
  docker build -t mongodb .
  cd ../
  docker-compose up
fi
