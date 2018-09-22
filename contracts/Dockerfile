FROM ethereum/solc:0.4.24 as solc-builder
FROM quay.io/monax/burrow:0.21.0-dev-2018-08-27-700d9bda
USER root

RUN apk add --update --no-cache bash curl jq
COPY --from=solc-builder /usr/bin/solc /usr/local/bin/

COPY . /app
WORKDIR /app
ENTRYPOINT []
CMD ["./deploy_contracts"]
