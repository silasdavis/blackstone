FROM hyperledger/burrow:0.23.2
USER root

RUN apk add --update --no-cache bash curl jq

COPY . /app
WORKDIR /app

ENTRYPOINT []

CMD ["/bin/sh", "-c", "./build_contracts && ./deploy_contracts"]
