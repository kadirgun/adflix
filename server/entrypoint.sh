#!/bin/bash

composer install
yarn install
chmod -R 777 storage
php artisan optimize:clear
chmod -R 777 bootstrap
php artisan migrate --seed
php artisan storage:link
php artisan octane:start --host 0.0.0.0 --watch