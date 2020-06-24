FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir /container

RUN apt-get update
RUN apt-get -y install unzip wget curl

RUN groupadd -r mongodb && useradd -r -g mongodb mongodb

RUN mkdir -p /container/mongodb

WORKDIR /tmp
RUN wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.2.8.tgz
RUN tar xvzf /tmp/mongodb-linux-x86_64-ubuntu1804-4.2.8.tgz -C /container/mongodb --strip-components 1

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
