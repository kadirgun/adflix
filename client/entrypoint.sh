#!/bin/bash

yarn install

if [ $APP_ENV = "local" ]
then
  echo "\033[33mRunning in local mode\033[0m"
  yarn dev
else
  echo "\033[33mRunning in production/stagging mode\033[0m"
  yarn build
  yarn start
fi