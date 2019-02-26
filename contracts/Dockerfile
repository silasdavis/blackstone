FROM quay.io/monax/burrow:0.24.0-dev-2019-02-26-8b59aade
USER root

RUN apk add --update --no-cache bash curl jq

COPY . /app
WORKDIR /app

ENTRYPOINT []

CMD ["/bin/sh", "-c", "./build_contracts && ./deploy_contracts"]
