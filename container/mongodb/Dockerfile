FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir /container

RUN apt-get update
RUN apt-get -y install unzip wget curl tzdata

RUN groupadd -r mongodb && useradd -r -g mongodb mongodb

RUN mkdir -p /container/mongodb

WORKDIR /tmp
RUN wget https://repo.mongodb.org/apt/ubuntu/dists/jammy/mongodb-org/7.0/multiverse/binary-amd64/mongodb-org-server_7.0.12_amd64.deb
RUN dpkg -i  mongodb-org-server_7.0.12_amd64.deb

COPY config /container/mongodb/config
RUN chown -R mongodb:mongodb /container/mongodb

RUN mkdir -p /data/db
RUN chown -R mongodb:mongodb /data

RUN mkdir -p /log/mongodb
RUN chown -R mongodb:mongodb /log/mongodb

COPY mongodb-entrypoint.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/mongodb-entrypoint.sh

ENV PATH=$PATH:/container/mongodb/bin

USER mongodb
WORKDIR /container/mongodb

EXPOSE 27017

ENTRYPOINT ["/usr/local/bin/mongodb-entrypoint.sh"]
