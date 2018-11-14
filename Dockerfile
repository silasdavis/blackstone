# For solc binary
FROM ethereum/solc:0.4.25 as solc-builder
# Burrow version on which Blackstone is tested
FROM hyperledger/burrow:0.23.1 as burrow-builder
# Testing image
FROM alpine:latest

RUN apk --update --no-cache add \
  bash \
  coreutils \
  curl \
  git \
  g++ \
  jq \
  libc6-compat \
  make \
  nodejs \
  nodejs-npm \
  openssh-client \
  parallel \
  python \
  py-crcmod \
  tar

ARG INSTALL_BASE=/usr/local/bin

COPY --from=burrow-builder /usr/local/bin/burrow $INSTALL_BASE/
COPY --from=solc-builder /usr/bin/solc $INSTALL_BASE/
