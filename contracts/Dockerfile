ARG BURROW_VERSION=0.23.1
FROM hyperledger/burrow:$BURROW_VERSION
USER root

RUN apk add --update --no-cache bash curl jq

COPY . /app
WORKDIR /app

ENTRYPOINT []

CMD ["./deploy_contracts"]
