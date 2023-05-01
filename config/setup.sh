#!/bin/bash

docker compose run --rm -v $PWD/config:/config -w /config python j2 nginx.j2 > ./config/nginx.conf
docker compose run --rm -v $PWD/config:/config -w /config python j2 nginx.dev.j2 > ./config/nginx.dev.conf