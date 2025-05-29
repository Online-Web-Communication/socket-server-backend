FROM ubuntu:24.04

RUN apt-get update && apt-get install -y coturn && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV TURN_PORT=3478
ENV TURN_PORT_START=10000
ENV TURN_PORT_END=20000
ENV TURN_SECRET=mysecret
ENV TURN_SERVER_NAME=coturn
ENV TURN_REALM=north.gov

COPY ./config/start_coturn.sh /etc
COPY ./config/turnserver.conf /etc
COPY ./config/coturn /etc/default

RUN chmod +x /etc/start_coturn.sh

WORKDIR /etc

CMD ["./start_coturn.sh"]
