FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir /container

RUN apt-get update
RUN apt-get -y install unzip curl

RUN groupadd -r api && useradd -r -g api api

RUN mkdir -p /container/api

RUN mkdir -p /container/api/.nvm
WORKDIR /container/api/.nvm

ENV NVM_DIR="/container/api/.nvm"
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

COPY api-entrypoint.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/api-entrypoint.sh

COPY src /container/api/src
COPY package.json /container/api
COPY index.js /container/api

RUN chown -R api:api /container/api

USER api
WORKDIR /container/api

ENV HOME=/container/api
RUN /bin/bash -c "source /container/api/.nvm/nvm.sh; nvm install 12;"

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/api-entrypoint.sh"]
