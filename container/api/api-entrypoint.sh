#!/bin/bash
echo "EXECUTING API ENTRY POINT>>>"

source /container/api/.nvm/nvm.sh; nvm use 12; npm install

node index.js admin

exec node index.js
