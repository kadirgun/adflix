#!/bin/bash

docker run --rm -v $PWD/.env:/.env -v $PWD/.env.example:/.env.example dotenvlinter/dotenv-linter compare .env .env.example