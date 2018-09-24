FROM ethereum/solc:0.4.25 as solc-builder
FROM hyperledger/burrow:0.22.0
USER root

RUN apk add --update --no-cache bash curl jq
COPY --from=solc-builder /usr/bin/solc /usr/local/bin/

COPY . /app
WORKDIR /app
ENTRYPOINT []
CMD ["./deploy_contracts"]
