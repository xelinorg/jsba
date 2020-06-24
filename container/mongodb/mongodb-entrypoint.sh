#!/bin/bash
echo "EXECUTING MONGODB ENTRY POINT>>>"
startUpConfig=''

if [ ! -z "$MONGO_ARGS" ]; then
  startUpConfig=$MONGO_ARGS
else
  startUpConfig=' --config /container/mongodb/config'
fi

echo "mongod startUpConfig is >>>" $startUpConfig
exec mongod $startUpConfig
