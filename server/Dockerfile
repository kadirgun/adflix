FROM php:8.1-alpine
USER root

RUN apk update
RUN apk add --no-cache \
        curl-dev \
        libxml2-dev \
        libjpeg-turbo-dev \
        libpng-dev \ 
        libwebp-dev \
        libzip-dev \
        zip \
        icu-dev \
        icu-libs \
        icu-data-full \
        freetype-dev

RUN apk add nodejs --no-cache
RUN apk add yarn --no-cache

RUN docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype
RUN docker-php-ext-configure zip
RUN docker-php-ext-configure intl

RUN docker-php-ext-install bcmath ctype curl dom fileinfo pdo_mysql gd zip intl
RUN docker-php-ext-enable bcmath ctype curl dom fileinfo pdo_mysql gd zip intl
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
RUN php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install sockets
RUN docker-php-ext-enable sockets

RUN apk add pcre-dev  ${PHPIZE_DEPS} --no-cache 
RUN apk add autoconf --no-cache
RUN pecl install igbinary
RUN pecl install redis
RUN docker-php-ext-enable redis

COPY ./entrypoint.sh /entrypoint.sh
WORKDIR /var/www/adflix/server

CMD ["sh", "/entrypoint.sh"]
