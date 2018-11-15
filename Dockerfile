ARG SOLC_VERSION=0.4.25
ARG BURROW_VERSION=0.23.1
# This container provides the test environment from which the various test scripts
# can be run
# For solc binary
FROM ethereum/solc:$SOLC_VERSION as solc-builder
# Burrow version on which Blackstone is tested
FROM hyperledger/burrow:$BURROW_VERSION as burrow-builder
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

ARG UID=1000
ARG GID=1000
ARG USER=api

RUN addgroup -g $GID -S $USER
RUN adduser -S -D -u $UID -G $USER $USER
USER $UID:$GID

WORKDIR /home/$USER

COPY --from=burrow-builder /usr/local/bin/burrow $INSTALL_BASE/
COPY --from=solc-builder /usr/bin/solc $INSTALL_BASE/
